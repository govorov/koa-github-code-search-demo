import * as CircularJSON from 'circular-json';

import {
    GenericApplicationError,
    IS_APP_ERROR,
} from 'errors/generic-application-error';

import { UnexpectedError } from 'errors/unexpected-error';


export const errorHandlingMiddlewareCreator = ({ logger }) => {
    return async (ctx, next) => {
        try {
            await next();
        }
        catch (rawError) {
            // good place to include custom error reporting to logstash or raven
            // for simplicity, I just serialize error code to console here
            const httpAwareError = wrapError(rawError);
            logger.error(`${httpAwareError.code} :: ${httpAwareError.message}`);

            // for debug purposes, error.details could be printed also,
            // but this object can be very large
            // standard JSON serializer won't work with object with circular references
            // logger.error(CircularJSON.stringify(httpAwareError.details));

            // node will print stack to console by default, so no need to log it twice while debugging
            // In production env good idea is to send stack with details to external system
            // logger.error(httpAwareError.stack);

            ctx.status = httpAwareError.status;
            ctx.body = CircularJSON.stringify(serializeError(httpAwareError));
            ctx.type = 'json';
        }
    };
};


const wrapError = (raw: Error): GenericApplicationError => {
    if (!raw[IS_APP_ERROR]) {
        return new UnexpectedError({ originalError: raw });
    }

    return raw as GenericApplicationError;
};


const serializeError = (error: GenericApplicationError) => {
    const { code, message, details, expose } = error;

    const result = {
        code,
        message,
        details: expose ? details : null,
    };

    return result;
};
