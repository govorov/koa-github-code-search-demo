import { GenericApplicationError } from 'errors/generic-application-error';


export class InputValidationError extends GenericApplicationError {

    constructor ({ originalError }) {
        super();
        if (originalError.isJoi) {
            this.details = originalError.details;
            this.message = this.details.map(d => d.message).join('\n');
        }
    }

    status = 422;
    code = 'invalidInput';
    message = 'Invalid input';
}
