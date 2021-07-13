import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/shared/scoped/angular-material.module';
import { ScopedModule } from 'src/shared/scoped/scoped.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
	    ReactiveFormsModule,
        AngularMaterialModule,
        ScopedModule
    ],
    declarations: [
        SearchComponent,
        SearchFilterComponent
    ],
    exports: [
        SearchComponent,
        SearchFilterComponent
    ]
})
export class SearchModule { }
