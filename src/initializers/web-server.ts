// koa itself
import * as Koa from 'koa';
// pretty request logging
import * as morgan from 'koa-morgan';

import { ApiAdapter } from 'api-adapter/interface';
import { AppConfig }  from 'config';
import { Routes }     from 'routes';


interface Options {
    apiAdapter: ApiAdapter;
    appConfig: AppConfig;
    logger: any;
}


export const initializeWebServer = ({ logger, appConfig, apiAdapter }: Options) => {
    const { port } = appConfig.webServer;
    logger.debug(`Starting web server on ${port}`);

    const webServer = new Koa();
    const routes = Routes({ logger, appConfig });

    webServer
        .use(morgan(':status :method :url  :res[content-length] - :response-time ms', { stream: logger.stream }))
        .use(routes.routes())
        .use(routes.allowedMethods())
        .listen(port);

    logger.debug('Web server started');
};
