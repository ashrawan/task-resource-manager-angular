/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorNotFoundComponent } from '../error/error-not-found/error-not-found.component';
import { LKRouteData } from '../common-model';

export const ERROR_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '404',
    },
    {
        path: '404',
        canActivate: [],
        component: ErrorNotFoundComponent,
        data: {
            title: 'Error 404',
        } as LKRouteData,
    },
    {
        path: '**',
        pathMatch: 'full',
        component: ErrorNotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ERROR_ROUTES)],
    exports: [RouterModule],
})
export class ErrorRoutingModule {}
