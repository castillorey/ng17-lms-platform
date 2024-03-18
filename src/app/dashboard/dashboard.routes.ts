import { Routes } from "@angular/router";
import { SearchComponent } from "./search/search.component";
import { RootComponent } from "./root/root.component";
import { CoursesComponent } from "./teacher/courses/courses.component";
import { AnalyticsComponent } from "./teacher/analytics/analytics.component";

export const DASHBOARD_ROUTES: Routes = [
	{
		path: '',
		component: RootComponent
	},
	{
		path: 'search',
		component: SearchComponent
	},
	{
		path: 'teacher/courses',
		component: CoursesComponent
	},
	{
		path: 'teacher/analytics',
		component: AnalyticsComponent
	}
]