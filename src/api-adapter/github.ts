import axios, { AxiosInstance } from 'axios';

import {
    ApiAdapter,
    SearchResults,
    QueryParameters,
} from 'api-adapter/interface';


export class GithubApiAdapter implements ApiAdapter {

    constructor({ logger }) {
        this.logger = logger;
        this.axios = axios.create({});
    }


    private logger: any;
    private axios: AxiosInstance;
    private rootEndpoint = 'https://api.github.com';
    private searchUrl = '/search/code';


    async query({ query, pageNumber = 1, pageSize = 25, sortBy = 'name' }: QueryParameters): Promise<SearchResults> {
        this.logger.debug(`Github search: "${query}", page ${pageNumber}, per page ${pageSize}, sort by ${sortBy}`);

        const params = {
            q: query,
        };

        try {
            const { data } = await this.axios.get(`${this.rootEndpoint}${this.searchUrl}`, { params });
            this.logger.debug(`Github search complete`);
            return this.formatResponse(data);
        }
        catch (requestError) {
            debugger
            console.log(requestError.response.data.errors);
            throw requestError;
        }
    }


    private formatResponse(raw: any): SearchResults {
        return raw;
    }

}
