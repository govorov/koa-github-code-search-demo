import * as Koa    from 'koa';
// pretty request logging
import * as morgan from 'koa-morgan';

import { ApiAdapter }                     from 'api-adapter/interface';
import { AppConfig }                      from 'config';
import { Routes }                         from 'routes';
import { errorHandlingMiddlewareCreator } from 'middleware/error-handling';


interface Options {
    apiAdapter: ApiAdapter;
    appConfig: AppConfig;
    logger: any;
}


export const initializeWebServer = ({logger, appConfig, apiAdapter}: Options) => {
    const { port } = appConfig.webServer;
    logger.debug(`Starting web server on port ${port}`);

    const webServer = new Koa();
    const routes = Routes({logger, appConfig});

    // inject api adapter
    webServer.context.apiAdapter = apiAdapter;

    const errorHandlerMiddleware = errorHandlingMiddlewareCreator({ logger });

    // when handling a lot of concurrent requests, each request should have unique id
    // in order to sort log entries. There's requestId middleware for that.
    // I find it useless for debug. If you need it, import it and attach to koa instance
    webServer
        .use(errorHandlerMiddleware)
        .use(morgan(':status :method :url  :res[content-length] - :response-time ms', {stream: logger.stream}))
        .use(routes.routes())
        .use(routes.allowedMethods())
        .listen(port);

    logger.debug('Web server started');
};
