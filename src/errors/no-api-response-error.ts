import { GenericApplicationError } from 'errors/generic-application-error';


export class NoApiResponseError extends GenericApplicationError {

    constructor({ originalError }) {
        super();
        this.details = { originalError };
    }

    code = 'api.noResponse';
    status = 502;
    message = 'No response from API';
}

