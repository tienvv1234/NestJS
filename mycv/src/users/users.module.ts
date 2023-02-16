import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
@Module({
    imports: [TypeOrmModule.forFeature([User])], // this line will create a repository for the User entity
    controllers: [UsersController],
    providers: [UsersService, AuthService, CurrentUserInterceptor], // add CurrentUserInterceptor to providers so that interceptor can inject into the service
})
export class UsersModule {}
