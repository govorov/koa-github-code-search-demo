import { Context }    from 'koa';
import { ApiAdapter } from 'api-adapter/interface';
import * as Joi  from 'joi';


// for proper typescript type inference
interface ContextWithDependencies extends Context {
    apiAdapter: ApiAdapter;
}


// use Joi to validate input data
const paramsSchema = Joi
    .object()
    .unknown(false)
    .keys({
        query: Joi
            .string()
            .required(),
    });


const validateInput = (params) => {
    const result = Joi.validate(params, paramsSchema);
    if (result.error != null) {
        // HERE class, move to utils
        throw result.error;
    }
}


export const searchAction = async (ctx: ContextWithDependencies, next) => {
    const { apiAdapter } = ctx;
    const params = ctx.request.query;

    validateInput(params);

    const result = await apiAdapter.query({
        query: params.query,
    });

    ctx.body = result;
    await next();
};
