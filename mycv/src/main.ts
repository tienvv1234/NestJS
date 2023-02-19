import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // app.use(
    //     cookieSession({
    //         keys: ['thisisasecretkeyforcookies'], // this is the key used to encrypt the cookie
    //     })
    // ); -------> move to app.module.ts

    // app.useGlobalPipes(
    //     new ValidationPipe({
    //         whitelist: true,
    //     })
    // ); move to app.module.ts
    (app as any).set('etag', false);
    app.use((req, res, next) => {
        res.removeHeader('x-powered-by');
        res.removeHeader('date');
        next();
    });
    await app.listen(3000);
}
bootstrap();
