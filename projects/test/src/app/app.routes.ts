import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        data:{
            breadcrumb:'home'
        },
        loadComponent:  () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'demo/tags',
        data:{
            breadcrumb:'tags'
        },
        loadComponent:  () => import('./tags/tags.component').then(m => m.TagsComponent)
    },
    {
        path: 'demo/ratings',
        data:{
            breadcrumb:'tags'
        },
        loadComponent:  () => import('./ratings/ratings.component').then(m => m.RatingsComponent)
    },
];
