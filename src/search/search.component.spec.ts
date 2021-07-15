/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchComponent } from './search.component';
import { HackerNewsService } from './services/hacker-news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IPaginationInfo } from './models/search.models';


describe('SearchFilterComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async(() => {
            TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule],
            declarations: [SearchComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('default class properties', () => {
        expect(component.displayedColumns).toEqual(['author', 'createdAt', 'numComments', 'points', 'title', 'url']);
        expect(component.searchTerm).toBe('');
        expect(component.isLoading).toBe(false);
        expect(component.page).toBe(0);
        expect(component.hitsPerPage).toBe(20);
        expect(component.nbPages).toBe(0);
        expect(component.nbHits).toBe(0);
        expect(component.hackerNewsSearchList).toEqual([]);
    });

    it('updatePaginationInfo function should update class properties', () => {
        let paginationInfo: IPaginationInfo = {
            page: 0,
            hitsPerPage: 20,
            nbPages: 2,
            nbHits: 40
        }

        component.updatePaginationInfo(paginationInfo);

        expect(component.nbPages).toBe(2);
        expect(component.nbHits).toBe(40);
    });

    it('updatePaginationInfo function should throw error if current page is larger than available pages', () => {
        let paginationInfo: IPaginationInfo = {
            page: 2,
            hitsPerPage: 20,
            nbPages: 2,
            nbHits: 40
        }

        component.page = 2;
        ;

        expect(() => {
            component.updatePaginationInfo(paginationInfo);
        }).toThrowError('Exceeded maximum page.');
    });
});
