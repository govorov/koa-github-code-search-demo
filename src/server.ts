import { appConfig }           from 'config';
import { GithubApiAdapter }    from 'api-adapter/github';
import { initializeLogger }    from 'initializers/logger';
import { initializeWebServer } from 'initializers/web-server';


// Wrapper for application startup logic
const bootstrap = async () => {
    // I use named arguments here to remove extra connascence of position
    // when adding extra options.
    // As number of dependencies is not so big, I see no need in DI container.
    // Injecting dependencies manually is fine in this prticular case.
    // If necessary, later migration to injection-js, typedi or similar libs is not a big deal
    const logger = await initializeLogger({ appConfig });
    const apiAdapter = new GithubApiAdapter({ logger });
    await initializeWebServer({ logger, apiAdapter, appConfig });
    logger.debug('Bootstrap done');
};


// Let's get started...
try {
    bootstrap();
}
catch (error) {
    console.error('Unable to start, something bad has happened');
    console.error(error);
    process.exit(1);
}
