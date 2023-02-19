import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
@Module({
    imports: [TypeOrmModule.forFeature([User])], // this line will create a repository for the User entity
    controllers: [UsersController],
    providers: [
        UsersService,
        AuthService,
        // {
        //     provide: APP_INTERCEPTOR, // global interceptor for all routes in all module
        //     useClass: CurrentUserInterceptor, // this will affect all routes in all module
        // }, // move this to the user.module.ts
    ], // add CurrentUserInterceptor to providers so that interceptor can inject into the service
})
export class UsersModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CurrentUserMiddleware).forRoutes('*');
    }
}
