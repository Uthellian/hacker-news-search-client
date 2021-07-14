import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	imports: [
		MatInputModule,
		MatCardModule,
        MatFormFieldModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSnackBarModule
	],
	exports: [
		MatInputModule,
		MatCardModule,
        MatFormFieldModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSnackBarModule
	]
})
export class AngularMaterialModule { }