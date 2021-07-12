import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/shared/scoped/angular-material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
	    ReactiveFormsModule,
        AngularMaterialModule
    ],
    declarations: [
        SearchComponent,
        SearchFilterComponent,
        SearchResultComponent
    ],
    exports: [
        SearchComponent,
        SearchFilterComponent,
        SearchResultComponent
    ]
})
export class SearchModule { }
