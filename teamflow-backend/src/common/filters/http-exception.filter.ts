import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter
    implements ExceptionFilter {
    catch(
        exception: unknown,
        host: ArgumentsHost,
    ) {
        const ctx = host.switchToHttp();

        const response =
            ctx.getResponse<Response>();

        const request =
            ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        // Log only unexpected errors
        if (!(exception instanceof HttpException)) {
            console.error(exception);
        }

        const exceptionResponse =
            exception instanceof HttpException
                ? exception.getResponse()
                : 'Internal server error';

        let message: string | string[];

        if (
            typeof exceptionResponse === 'object' &&
            exceptionResponse !== null
        ) {
            message = (exceptionResponse as any).message;
        } else {
            message = exceptionResponse as string;
        }

        response.status(status).json({
            success: false,
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}