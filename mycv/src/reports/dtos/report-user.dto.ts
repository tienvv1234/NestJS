import { Expose } from 'class-transformer';
import { User } from 'src/users/user.entity';

export class ReportUserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
    }
}
