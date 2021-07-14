import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError, mapTo, retryWhen, scan, takeWhile, tap } from 'rxjs/operators';
import { genericRetryStrategy } from 'src/shared/utility/error-handling';
import { IPaginationInfo, ISearchFilter, ISearchResultListItem } from './models/search.models';
import { HackerNewsService } from './services/hacker-news.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    displayedColumns: string[] = ['author', 'createdAt', 'numComments', 'points', 'title', 'url'];

    searchTerm = '';
    isLoading = false;
    page = 0;
    hitsPerPage = 20;
    nbPages = 0;
    nbHits = 0;

    hackerNewsSearchList: ISearchResultListItem[] = [];

    constructor(private hackerNewsService: HackerNewsService, private snackBar: MatSnackBar) { }

    ngOnInit() {
    }

    updatePaginationInfo(paginationInfo: IPaginationInfo) {
        const currentPageNum = this.page + 1;
        
        if (currentPageNum > paginationInfo.nbPages && paginationInfo.nbPages > 0) {
            throw Error('Exceeded maximum page.');
        }

        this.nbPages = paginationInfo.nbPages;
        this.nbHits = paginationInfo.nbHits;
    }

    search(searchFilter: ISearchFilter) {
        this.isLoading = true;

        this.hackerNewsService.search(searchFilter)
            .pipe(
                tap(searchResult => {
                    this.hackerNewsSearchList = searchResult.hits.map(hit => 
                        ({ 
                            author: hit.author,
                            createdAt: hit.created_at,
                            numComments: hit.num_comments,
                            points: hit.points,
                            title: hit.title,
                            url: hit.url 
                        }));
                    
                    const paginationInfo = {
                        page: searchResult.page,
                        hitsPerPage: searchResult.hitsPerPage,
                        nbPages: searchResult.nbPages,
                        nbHits: searchResult.nbHits
                    } as IPaginationInfo

                    this.updatePaginationInfo(paginationInfo);

                    this.isLoading = false;
                }),
                // The data from Hacker News Search API is constantly changing so we need to try and handle it a bit better.
                // At the moment we'll just retry up to 3 times with a scaling duration.
                retryWhen(genericRetryStrategy()),
                catchError(error => {
                    this.isLoading = false;
                    
                    this.snackBar.open(
                        'An error occured try searching again in a little while.',
                        'Close', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' }
                    );
                    
                    return of(error);
                })
            ).subscribe();
    }

    onInputtedServerSideSearch(searchTerm: string) {
        this.searchTerm = searchTerm;
        this.page = 0;
        this.nbPages = 20;

        if (!this.searchTerm) {
            this.hackerNewsSearchList = [];
            return;
        }
        
        const searchFilter = {
            query: this.searchTerm,
            page: 0,
            hitsPerPage: 20
        }

        this.search(searchFilter);
    }

    onInputtedClientSideSearch(searchTerm: string) {
    }

    onPaginatorChange(paginator: PageEvent) {
        this.page = paginator.pageIndex;
        this.hitsPerPage = paginator.pageSize;
        
        const searchFilter = {
            query: this.searchTerm,
            page: this.page,
            hitsPerPage: this.hitsPerPage
        }

        this.search(searchFilter);
    }
}
