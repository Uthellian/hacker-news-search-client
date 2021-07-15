/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchFilterComponent } from './search-filter.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchFilterComponent', () => {
    let component: SearchFilterComponent;
    let fixture: ComponentFixture<SearchFilterComponent>;

    beforeEach(async(() => {
            TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [SearchFilterComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('default form values', () => {
        expect(component.clientSideSearch!.value).toBeNull();
        expect(component.serverSideSearch!.value).toBeNull();
    });

    it('form value should update from form changes', () => {
        component.clientSideSearch!.setValue('test');
        expect(component.clientSideSearch!.value).toBe('test');

        component.serverSideSearch!.setValue('testing');
        expect(component.serverSideSearch!.value).toBe('testing');
    });

    it('form should be valid', () => {
        expect(component.filterForm.valid).toBeTrue();
    });

    it('should listen for form changes', fakeAsync(() => {
        spyOn(component.inputtedClientSideSearch, 'emit');
        component.clientSideSearch!.setValue('test');
        tick(500);
        expect(component.inputtedClientSideSearch.emit).toHaveBeenCalledWith('test');
        
        spyOn(component.inputtedServerSideSearch, 'emit');
        component.serverSideSearch!.setValue('testing');
        tick(500);
        expect(component.inputtedServerSideSearch.emit).toHaveBeenCalledWith('testing');
    }));
});
