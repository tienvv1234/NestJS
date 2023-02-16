import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    Request,
    Session,
    UseInterceptors,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    // @Get('/colors/:color')
    // setColor(@Param('color') color: string, @Session() session: any) {
    //     session.color = color;
    //     return { message: 'color set' };
    // }

    // @Get('/colors')
    // getColor(@Session() session: any) {
    //     return session.color;
    // }

    @Post('signout')
    signout(@Session() session: any) {
        session.userId = null;
        return { message: 'signed out' };
    }

    // get current userid and query user from database
    // @Get('/whoami')
    // whoAmI(@Session() session: any) {
    //     if (!session.userId) {
    //         return null;
    //     }
    //     return this.usersService.findOne(session.userId);
    // }

    // to get current user in request using decorator
    @Get('/whoami')
    whoAmI(@CurrentUser() user: User) {
        // Interceptor current user Step 4
        return user;
    }

    // other way to get current user in request
    // @Get('/whoami')
    // whoAmI(@Request() request: Request) {
    //     // Interceptor current user Step 4
    //     return request.currentUser;
    // }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        // Interceptor current user Step 1
        return user;
    }

    // cookie-session will set a cookie on the browser
    // if the value is identical to the previous value then it will not send the cookie
    // if the value is different then it will send the cookie
    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        // Interceptor current user Step
        return user;
    }

    // @UseInterceptors(new SerializeInterceptor(UserDto('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }
}
