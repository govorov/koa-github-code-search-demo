export interface QueryParameters {
    query: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: string;
}


export interface ApiAdapter {
    query: (params: QueryParameters) => Promise<SearchResults>;
}


export interface SearchResults {
    results: Array<{
        owner: string;
        repository: string;
        fileName: string;
    }>;

    meta: {
        total: number;
    };
}
