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

};


const isProduction = process.env.NODE_ENV === 'production';
const DEFAULT_PORT = 3000;


export const appConfig: AppConfig = {

    webServer: {
        port: process.env.PORT || DEFAULT_PORT,
    },

    logger: {
        level: isProduction ? 'warn' : 'debug',
    },

    router: {
        base: '/api',
    },

};
