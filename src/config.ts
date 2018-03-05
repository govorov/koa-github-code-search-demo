export interface AppConfig {

    webServer: {
        port: string|number;
    };

    logger: {
        level: string;
    };

    router: {
        base: string;
    };

}


const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const loglevel = process.env.APP_LOGLEVEL || (isProduction ? 'warn' : 'debug');


export const appConfig: AppConfig = {

    webServer: {
        port,
    },

    logger: {
        level: loglevel,
    },

    router: {
        base: '/api',
    },

};
