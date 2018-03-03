export const searchAction = async (ctx, next) => {
    ctx.body = 'search has been triggered';
    await next();
};
