import axios, { AxiosInstance } from 'axios';

import {
    ApiAdapter,
    SearchResults,
    QueryParameters,
}                             from 'api-adapter/interface';
import { ApiError }           from 'errors/api-error';
import { NoApiResponseError } from 'errors/no-api-response-error';


export class GithubApiAdapter implements ApiAdapter {

    constructor({ logger }) {
        this.logger = logger;
        this.axios = axios.create({
            headers: {
                // https://developer.github.com/v3/media/#request-specific-version
                Accept: 'application/vnd.github.v3+json',
            },
        });
    }


    private logger: any;
    private axios: AxiosInstance;
    private rootEndpoint = 'https://api.github.com';
    private searchUrl = '/search/code';


    async query({
        query,
        pageNumber = 1,
        pageSize = 25,
        sortBy = 'score',
        sortOrder = 'desc',
    }: QueryParameters): Promise<SearchResults> {
        this.logger.debug(`Github search: "${query}"`);
        this.logger.debug(`Page ${pageNumber}, per page ${pageSize}, sort by ${sortBy}, order ${sortOrder}`);

        const params = {
            q       : query,
            page    : pageNumber,
            per_page: pageSize,
            sort    : sortBy,
            order   : sortOrder,
        };

        try {
            const { data } = await this.axios.get(`${this.rootEndpoint}${this.searchUrl}`, { params });
            this.logger.debug(`Github search complete`);
            return this.formatResponse(data);
        }
        catch (requestError) {
            // got api resonse, but not successfull
            if (requestError.response != null) {
                // wrap response error to our application error
                throw new ApiError({ originalError: requestError });
            }
            // no response
            else {
                throw new NoApiResponseError({ originalError: requestError });
            }
        }
    }


    private formatResponse(raw: any): SearchResults {
        const results = raw.items.map((item) => {

            const repo = item.repository;

            return {
                // I use full path instead of just name as it's more useful
                fileName: item.name,
                owner: repo.owner.login,
                repository: repo.full_name,
            };
        });

        const total = raw.total_count;

        return {
            meta: {
                total,
            },
            results,
        };
    }

}
