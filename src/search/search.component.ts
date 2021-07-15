import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError, mapTo, retryWhen, scan, takeWhile, tap } from 'rxjs/operators';
import { genericRetryStrategy } from 'src/shared/utility/error-handling';
import { IPaginationInfo, ISearchFilter, ISearchResultListItem } from './models/search.models';
import { HackerNewsService } from './services/hacker-news.service';
import Fuse from 'fuse.js';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    displayedColumns: string[] = ['author', 'createdAt', 'numComments', 'points', 'title', 'url'];

    serverSideSearchTerm = '';
    isLoading = false;
    page = 0;
    hitsPerPage = 20;
    nbPages = 0;
    nbHits = 0;

    hackerNewsSearchList: ISearchResultListItem[] = [];

    clientSideSearchTerm = '';
    hackerNewsSearchFilteredList: ISearchResultListItem[] = [];

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
                    
                    this.filterSearchResult();

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
                // At the moment we'll just retry up to 1 time with a scaling duration.
                retryWhen(genericRetryStrategy({
                    maxRetryAttempts: 1
                  })),
                catchError(error => {
                    this.isLoading = false;
                    
                    this.snackBar.open(
                        'Unable to load the next page.',
                        'Close', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' }
                    );
                    
                    return of(error);
                })
            ).subscribe();
    }

    filterSearchResult() {
        if (!this.clientSideSearchTerm) {
            this.hackerNewsSearchFilteredList = [];
            return;
        }
        
        const options = {
            keys: ['title']
        };
        const fuse = new Fuse(this.hackerNewsSearchList, options);

        this.hackerNewsSearchFilteredList = fuse.search(this.clientSideSearchTerm).map(m => m.item);
    }

    onInputtedServerSideSearch(searchTerm: string) {
        this.serverSideSearchTerm = searchTerm;
        this.page = 0;
        this.nbPages = 20;

        if (!this.serverSideSearchTerm) {
            this.hackerNewsSearchList = [];
            return;
        }
        
        const searchFilter = {
            query: this.serverSideSearchTerm,
            page: 0,
            hitsPerPage: 20
        }

        this.search(searchFilter);
    }

    onInputtedClientSideSearch(searchTerm: string) {
        this.clientSideSearchTerm = searchTerm;
        this.filterSearchResult();
    }

    onPaginatorChange(paginator: PageEvent) {
        this.page = paginator.pageIndex;
        this.hitsPerPage = paginator.pageSize;
        
        const searchFilter = {
            query: this.serverSideSearchTerm,
            page: this.page,
            hitsPerPage: this.hitsPerPage
        }

        this.search(searchFilter);
    }
}
