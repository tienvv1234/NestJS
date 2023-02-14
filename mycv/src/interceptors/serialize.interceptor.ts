import {
    CallHandler,
    ExecutionContext,
    NestInterceptor,
    UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function Serialize(dto: any) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}

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
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true, // this will remove the properties that are not defined in the UserDto class
                });
            })
        );
    }
}
