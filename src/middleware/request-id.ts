import { v4 as uuid } from 'uuid';


export const requestIdMiddleware = async (ctx, next) => {
    ctx.requestId = uuid();
    await next();
};
