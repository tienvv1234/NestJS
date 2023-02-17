import { Expose, Transform } from 'class-transformer';
import { User } from '../../users/user.entity';
import { ReportUserDto } from './report-user.dto';
export class ReportDto {
    @Expose()
    id: number;

    @Expose()
    price: number;

    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    year: number;

    @Expose()
    lat: number;

    @Expose()
    lng: number;

    @Expose()
    mileage: number;

    @Expose()
    approved: boolean;

    // @Expose()
    // @Transform(({ obj }) => obj.user.email)
    // email: string;

    // @Expose()
    // @Transform(({ obj }) => obj.user.id)
    // userId: number;
    @Expose()
    @Transform(({ obj }) => new ReportUserDto(obj.user), { toClassOnly: true })
    reportUser: ReportUserDto;
}
