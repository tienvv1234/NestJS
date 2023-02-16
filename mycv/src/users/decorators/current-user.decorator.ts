import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: never, ctx: ExecutionContext) => {
        // data is not used
        // Interceptor current user Step
        const request = ctx.switchToHttp().getRequest();
        return request.currentUser;
    }
);
