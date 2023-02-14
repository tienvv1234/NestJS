import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])], // this line will create a repository for the User entity
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
