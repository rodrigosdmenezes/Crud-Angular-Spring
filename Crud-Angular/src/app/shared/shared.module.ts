import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';
import {MatIconModule} from '@angular/material/icon';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    ErrorDialogComponent,
    CategoryPipe,
    MatIconModule,
    ConfirmationDialogComponent
  ],
  exports:[
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
