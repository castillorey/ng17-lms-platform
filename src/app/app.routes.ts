import { Routes } from '@angular/router';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		canActivate: [authGuard],
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
