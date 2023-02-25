import {
    ArgumentMetadata,
    HttpException,
    HttpStatus,
    PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export class BackendValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        console.log('value', value);
        console.log('metadata', metadata);
        const object = plainToInstance(metadata.metatype, value);
        // this object is now an instance of the class
        console.log('object', object);
        console.log('object !== ', object !== 'object');
        if (typeof object !== 'object') {
            return value;
        }

        const errors = await validate(object);
        console.log('errors', errors);
        if (errors.length === 0) {
            console.log('1111111111111111111');
            return value;
        }

        throw new HttpException(
            {
                errors: this.formatErrors(errors),
            },
            HttpStatus.UNPROCESSABLE_ENTITY
        );
    }

    formatErrors(errors: ValidationError[]) {
        return errors.reduce((acc, error) => {
            acc[error.property] = Object.values(error.constraints);
            return acc;
        }, {});
    }
}
