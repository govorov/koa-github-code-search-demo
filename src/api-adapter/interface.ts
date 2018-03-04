export interface QueryParameters {
    query: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
}


export interface ApiAdapter {
    query: (params: QueryParameters) => SearchResults;
}


export interface SearchResults {
}
