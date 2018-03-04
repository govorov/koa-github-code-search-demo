import { GenericApplicationError } from 'errors/generic-application-error';


export class UnexpectedError extends GenericApplicationError {

    constructor({ originalError }) {
        super();
        this.details = { originalError };
    }

    code = 'generic.unexpected';
    status = 500;

}
