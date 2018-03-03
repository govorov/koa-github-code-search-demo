import * as winston from 'winston';
import { AppConfig } from 'config';


interface Options {
    appConfig: AppConfig;
}


export const initializeLogger = async ({ appConfig }: Options) => {
    const { combine, timestamp, printf } = winston.format;
    const { Console } = winston.transports;

    const logEntryFormat = printf((info: any) => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
    });

    const logger = await winston.createLogger({
        transports: [
            new Console({
                level: appConfig.logger.level,
                colorize: true,
            }),
        ],
        format: combine(
            timestamp(),
            logEntryFormat,
        ),
    });

    logger.stream = {
        write: function(message: string, encoding: string){
            logger.info(message);
        }
    };

    return logger;
};
