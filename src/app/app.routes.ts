import { Routes } from '@angular/router';
import { LayoutComponent } from './dashboard/layout/layout.component';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		loadChildren: () => import('./dashboard/dashboard.routes').then((x) => x.DASHBOARD_ROUTES)
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.routes').then((x) => x.AUTH_ROUTES)
	},
	{
		path: '**',
		loadChildren: () => import('./dashboard/dashboard.routes').then((x) => x.DASHBOARD_ROUTES)
	}
];
