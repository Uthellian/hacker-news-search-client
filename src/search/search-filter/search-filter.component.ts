import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnDestroy {

    filterForm = this.formBuilder.group({
        serverSideSearch: [null],
        clientSideSearch: [null]
    });

    get serverSideSearch() { return this.filterForm.get('serverSideSearch'); }
    get clientSideSearch() { return this.filterForm.get('clientSideSearch'); }

    @Output() inputtedServerSideSearch = new EventEmitter<string>();
    @Output() inputtedClientSideSearch = new EventEmitter<string>();

    serverSideSearchTermSub = this.serverSideSearch!
        .valueChanges
        .pipe(
            debounceTime(200),
            tap(t => this.inputtedServerSideSearch.emit(t))
        )
        .subscribe();

    clientSideSearchTermSub = this.clientSideSearch!
        .valueChanges
        .pipe(
            debounceTime(200),
            tap(t => this.inputtedClientSideSearch.emit(t))
        )
        .subscribe();

    constructor(private formBuilder: FormBuilder) { }

    ngOnDestroy() {
        this.serverSideSearchTermSub.unsubscribe();
        this.clientSideSearchTermSub.unsubscribe();
    }

}
