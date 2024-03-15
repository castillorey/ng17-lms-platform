import { Routes } from "@angular/router";
import { SearchComponent } from "./search/search.component";
import { RootComponent } from "./root/root.component";

export const DASHBOARD_ROUTES: Routes = [
	{
		path: '',
		component: RootComponent
	},
	{
		path: 'search',
		component: SearchComponent
	}
]