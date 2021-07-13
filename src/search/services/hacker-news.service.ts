import { Injectable } from '@angular/core';
import { IHackerNewSearchResult, ISearchFilter } from '../models/search.models';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HackerNewsService {

    constructor(
        private httpClient: HttpClient
    ) { }

    search(filter: ISearchFilter) {
        const url = 'http://hn.algolia.com/api/v1/search';
        const params = new HttpParams()
            .set('query', filter.query)
            .set('page', filter.page)
            .set('hitsPerPage', filter.hitsPerPage);

        return this.httpClient.get<IHackerNewSearchResult>(url, { params });
    }
}
