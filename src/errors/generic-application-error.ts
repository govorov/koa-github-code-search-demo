export const IS_APP_ERROR = Symbol('Application error');


export class GenericApplicationError extends Error {
    public status = 500;
    // Error codes are better than error just message texts for i18n reasons and aggregation purposes
    // In addition, HTTP codes are not enough to cover all possible error cases
    // and sometimes multiple business logic aware errors could be mapped to one HTTP code
    public code: string = 'generic';
    public message: string = 'Something went wrong';
    public details: any = null;
    public expose: boolean = false;
    // use symbol to avoid name clashing
    public [IS_APP_ERROR] = true;
}
