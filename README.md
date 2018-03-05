## Github code search demo app

Uses v3 github api. Related documentation is [here](https://developer.github.com/v3)

Tested on node v9.5.0

Based on [Koa](http://koajs.com)❤

### Dev usage
`yarn install && yarn start` (I use yarn, but npm works fine also)


In dev mode file changes inside `src` directory are being watched by [nodemon](https://github.com/remy/nodemon)

`--inspect` flag is used for better debugging experience

[ts-node](https://github.com/TypeStrong/ts-node) is used for on-the-fly compilation.

`NODE_ENV` is set to `development`.

Use `APP_LOGLEVEL` to set log level to one of:

* error
* warn
* info
* verbose
* debug
* silly

See logger [documentation](https://github.com/winstonjs/winston) for more details.

### "Production" build

`yarn install --production && yarn build`
and then
`yarn start:prod`

### Querying

GET /api/search?query=QUERY

Where QUERY is required parameter.

Other parameters are optional:

* page
* per_page
* sort_by
* order_by

All these parameters will be sent to github API directly (with slightly different names, though).

Hence all query language features are [supported](https://help.github.com/articles/searching-code/)

API adapter is nothing but class satisfying following requirements:

* it expects `{ logger }` as constructor arguments
* it has `async query` method
* query method expects `QueryParameters` input and returns `Promise<SearchResults>`

Where:

```
export interface QueryParameters {
    query: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: string;
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
```

Given that information, switching between various backends is as simple as changing `apiAdapter` instance passed to `initializeWebServer` method.

API status codes are being passed as is. Errors are wrapped in application errors.

### Response format

Consider query like `0.0.0.0:3000/api/search?query=user:govorov  language:typescript&page=1&per_page=10`

Output:

```
{
    "meta": {
        "total": 24 // total results found
    },
    "results": [
        ...
        ...
        ...
        {
            "fileName": "card.ts",
            "owner": "govorov",
            "repository": "govorov/graphql-typeorm-koa-workshop"
        },
        {
            "fileName": "create-card.ts",
            "owner": "govorov",
            "repository": "govorov/graphql-typeorm-koa-workshop"
        },
        {
            "fileName": "toggle-card.ts",
            "owner": "govorov",
            "repository": "govorov/graphql-typeorm-koa-workshop"
        },
        ...
        ...
        ...
    ]
}
```
