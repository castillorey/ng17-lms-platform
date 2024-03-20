drop table if exists user_course;
drop table if exists attachment;
drop table if exists category;
drop table if exists course;
drop table if exists users;

-- Create Category table
create table category (
  id bigint generated by default as identity primary key,
  name varchar unique default ''
);

-- Create Course table
create table course (
  id bigint generated by default as identity primary key,
  creator uuid references auth.users not null default auth.uid(),
  title text default 'Untitled Course',
  description text null,
  image_url text null,
  price float null,
  is_published bit null,
  category_id bigint references category null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp null
);

-- Create Attachment table
create table attachment (
  id bigint generated by default as identity primary key,
  name varchar not null,
  url text not null,
  course_id bigint references course not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp null
);

-- Many to many table for user <-> course relationship
create table user_course (
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users ON DELETE CASCADE not null default auth.uid(),
  course_id bigint references course ON DELETE CASCADE
);

-- User ID lookup table
create table users (
  id uuid not null primary key,
  email text
);

-- Make sure deleted records are included in realtime
alter table category replica identity full;
alter table attachment replica identity full;

-- Function to get all user courses
create or replace function get_courses_for_authenticated_user()
returns setof bigint
language sql
security definer
set search_path = public
stable
as $$
    select course_id
    from user_course
    where user_id = auth.uid()
$$;
-----------------------------------------------------------------
--Add security level
-- course row level security
alter table course enable row level security;

-- Policies
create policy "Users can create courses" on course for
  insert to authenticated with CHECK (true);

create policy "Users can view their courses" on course for
    select using (
      id in (
        select get_courses_for_authenticated_user()
      )
    );

create policy "Users can update their courses" on course for
    update using (
      id in (
        select get_courses_for_authenticated_user()
      )
    );

create policy "Users can delete their created courses" on course for
    delete using (auth.uid() = creator);

-- user_course row level security
alter table user_course enable row level security;

create policy "Users can add their courses" on user_course for
    insert to authenticated with check (true);

create policy "Users can view courses" on user_course for
    select using (auth.uid() = user_id);

create policy "Users can delete their courses" on user_course for
    delete using (auth.uid() = user_id);

-- category row level security
alter table attachment enable row level security;

-- Policies
create policy "Users can edit attachments if they are part of the course" on attachment for
    all using (
      course_id in (
        select get_courses_for_authenticated_user()
      )
    );

-----------------------------------------------------------------
 -- Add triggers
 -- inserts a row into user_course
create function public.handle_course_added()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.user_course (course_id, user_id)
  values (new.id, auth.uid());
  return new;
end;
$$;

-- trigger the function every time a course is created
create trigger on_course_created
  after insert on course
  for each row execute procedure public.handle_course_added();
