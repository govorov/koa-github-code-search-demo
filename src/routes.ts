import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { searchAction } from 'actions/search';


export const Routes = ({ appConfig, logger }) => {
    // Nothing special here. Docs: https://github.com/alexmingoia/koa-router
    const routes = new Router();
    const base = appConfig.router.base;

    routes.use(bodyParser());
    routes.get(`${base}/search`, searchAction);

    return routes;
};
