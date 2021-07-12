import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HackerNewsService } from './services/hacker-news.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    serverSideSearch$ = new BehaviorSubject<string>('');
    clientSideSearch$ = new BehaviorSubject<string>('');

    constructor(private hackerNewsService: HackerNewsService) { }

    ngOnInit() {
        // TODO: Remove test code.
        const searchFilter = {
            query: 'test'
        }
        this.hackerNewsService.search(searchFilter).subscribe(s => console.log(s));
    }

    onInputtedServerSideSearch(searchTerm: string) {
        this.serverSideSearch$.next(searchTerm);
        console.log(searchTerm);
    }

    onInputtedClientSideSearch(searchTerm: string) {
        this.clientSideSearch$.next(searchTerm);
    }
}
