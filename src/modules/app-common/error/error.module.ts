import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ErrorComponent,
    ErrorNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class ErrorModule {
}
