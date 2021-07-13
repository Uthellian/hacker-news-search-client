import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "./angular-material.module";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
    imports:[
        AngularMaterialModule
    ],
	declarations: [
        LoadingSpinnerComponent
	],
	exports: [
        LoadingSpinnerComponent
	]
})
export class ScopedModule { }