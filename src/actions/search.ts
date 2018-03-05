import { Context }              from 'koa';
import { ApiAdapter }           from 'api-adapter/interface';
import * as Joi                 from 'joi';
import { InputValidationError } from 'errors/input-validation-error';


// for proper typescript type inference
interface ContextWithDependencies extends Context {
    apiAdapter: ApiAdapter;
}


// use Joi to validate input data
const paramsSchema = Joi
    .object()
    // set unknown to true to allow arbitrary get params
    .unknown(false)
    .keys({
        query: Joi
            .string()
            .required(),
        page: Joi
            .number(),
        per_page: Joi
            .number(),
        sort_by: Joi
            .string(),
        sort_order: Joi
            .string(),
    });


const validateInput = (params) => {
    const result = Joi.validate(params, paramsSchema);
    if (result.error != null) {
        throw new InputValidationError({
            originalError: result.error,
        })
    }
}


export const searchAction = async (ctx: ContextWithDependencies, next) => {
    const params = ctx.request.query;
    validateInput(params);

    const result = await ctx.apiAdapter.query({
        query     : params.query,
        pageNumber: params.page,
        pageSize  : params.per_page,
        sortBy    : params.sort_by,
        sortOrder : params.sort_order,
    });

    ctx.body = result;
    await next();
};
