export interface ISearchFilter {
    query: string;
    page: number;
    hitsPerPage: number;
}

export interface ISearchResultListItem {
    author: string;
    createdAt: Date;
    numComments: number;
    points: number;
    title: string;
    url: string;
}

export interface IHit {
    author: string;
    created_at: Date;
    num_comments: number;
    points: number;
    title: string;
    url: string;
}

/** https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/pagination/js/#pagination-at-query-time */
export interface IHackerNewSearchResult {
    hits: IHit[];

    // The current page
    page: number; 

    // Maximum number of hits returned for each page
    hitsPerPage: number;

    // Number of pages available for the current query
    nbPages: number;

    // Number of hits that the search query matched
    nbHits: number;
}