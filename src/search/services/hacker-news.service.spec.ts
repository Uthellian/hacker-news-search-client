/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HackerNewsService } from './hacker-news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IHackerNewSearchResult } from '../models/search.models';
import { defer, of } from 'rxjs';

/** Create async observable that emits-once and completes
 *  after a JS engine turn */
 function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }

let httpClientSpy: { get: jasmine.Spy };
let hackerNewsService: HackerNewsService;

describe('Service: HackerNews', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HackerNewsService]
        });

        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        hackerNewsService = new HackerNewsService(httpClientSpy as any);
    });

    it('should ...', inject([HackerNewsService], (service: HackerNewsService) => {
        expect(service).toBeTruthy();
    }));

    it('should return hacker news search result (HttpClient called once)', (done: DoneFn) => {
        const expectedHackerNewsSearch: IHackerNewSearchResult = {
            hits: [],
            page: 0,
            hitsPerPage: 20,
            nbPages: 0,
            nbHits: 0
        };

        const searchFilter = {
            query: 'aljsfdlkjdflsdlkf',
            page: 0,
            hitsPerPage: 20
        }

        httpClientSpy.get.and.returnValue(asyncData(expectedHackerNewsSearch));

        hackerNewsService.search(searchFilter).subscribe(
            heroes => {
            expect(heroes).toEqual(expectedHackerNewsSearch, 'expected hacker news search result');
            done();
            },
            done.fail
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
});
