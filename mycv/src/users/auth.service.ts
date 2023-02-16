import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string): Promise<User> {
        // see if email is in use
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('email in use');
        }
        // Hash the users  password
        // generate a salt
        // salt will be a random string of characters(16 characters)
        // because randomBytes with 8 bytes will return a string of 16 characters
        const salt = randomBytes(8).toString('hex');

        // hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // join the salt and the hash together
        const result = salt + '.' + hash.toString('hex');
        // create a new user and save it
        const user = await this.usersService.create(email, result);
        // return the user
        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Bad password');
        }

        return user;
    }
}
