import { Expose, Transform } from 'class-transformer';
import {
    IsLatitude,
    IsLongitude,
    IsNumber,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class GetEstimateDto {
    @IsString()
    @Expose()
    make: string;

    @IsString()
    @Expose()
    model: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1900)
    @Max(2050)
    year: number;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLongitude()
    @Expose()
    lng: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLatitude()
    @Expose()
    lat: number;
}
