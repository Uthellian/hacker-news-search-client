import { Injectable } from '@angular/core';
import { ISearchFilter } from '../models/search.models';
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
            .set('query', filter.query);

        return this.httpClient.get<any>(url, { params });
    }
}
