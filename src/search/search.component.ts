import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { ISearchFilter, ISearchResultListItem } from './models/search.models';
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

    constructor(private hackerNewsService: HackerNewsService) { }

    ngOnInit() {
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
                    
                    this.nbPages = searchResult.nbPages;
                    this.nbHits = searchResult.nbHits;

                    this.isLoading = false;
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
