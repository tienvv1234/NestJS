import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        // Run something before a request is handled by the request handler
        // console.log('Im running before the handler', context);
        return next.handle().pipe(
            map((data: any) => {
                // Run something before the response is sent out
                // console.log('Im running after the handler', data);

                // this is the class that we want to transform the data into Json
                // Expose in Class UserDto are used to control the data that is sent back to the client
                return plainToClass(UserDto, data, {
                    excludeExtraneousValues: true, // this will remove the properties that are not defined in the UserDto class
                });
            })
        );
    }
}
