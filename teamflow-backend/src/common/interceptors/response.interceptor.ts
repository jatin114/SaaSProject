import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                // Already paginated response
                if (
                    data &&
                    typeof data === 'object' &&
                    'data' in data &&
                    'pagination' in data
                ) {
                    return {
                        success: true,
                        message: 'Success',
                        data: data.data,
                        pagination: data.pagination,
                    };
                }

                return {
                    success: true,
                    message: 'Success',
                    data,
                };
            }),
        );
    }
}