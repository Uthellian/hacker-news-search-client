import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../shared/scoped/angular-material.module';
import { SearchModule } from '../search/search.module';
import { HttpClientModule } from '@angular/common/http';
import { ScopedModule } from 'src/shared/scoped/scoped.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        SearchModule,
        HttpClientModule,
        ScopedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
