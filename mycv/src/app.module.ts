import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/reports.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TestModule } from './test/test.controller';
const cookieSession = require('cookie-session');
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // this makes the config service available to all modules
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'sqlite',
                database: configService.get<string>('DB_NAME'),
                synchronize: true,
                entities: [User, Report],
            }),
        }),
        // TypeOrmModule.forRoot({
        //     // set up the database connection,
        //     type: 'sqlite', // the method forRoot() is a shortcut for the forRootAsync() method
        //     database: 'db.sqlite',
        //     entities: [User, Report],
        //     synchronize: true,
        // }),
        UsersModule,
        ReportsModule,
        TestModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true,
            }),
        }, // this is a global pipe for all routes in all module
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                cookieSession({
                    keys: ['thisisasecretkey'],
                })
            )
            .forRoutes('*');
    }
}
