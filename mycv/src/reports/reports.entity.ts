import { User } from '../users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: false,
    })
    approved: boolean;

    @Column()
    price: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    lat: number;

    @Column()
    lng: number;

    @Column()
    mileage: number;

    // this function here will solve the problem of the circular dependency
    @ManyToOne(() => User, (user) => user.reports)
    user: User;
}
