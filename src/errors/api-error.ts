import { GenericApplicationError } from 'errors/generic-application-error';


export class ApiError extends GenericApplicationError {

    constructor({ originalError }) {
        super();
        this.details = originalError.response.data;
        this.message = this.details.message;
        this.status = originalError.response.status;
    }

    code = 'apiError';
    expose = true;

}
