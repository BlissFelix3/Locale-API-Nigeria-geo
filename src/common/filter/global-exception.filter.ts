/* Global Error Handling for the controllers */
import { Catch, ArgumentsHost } from '@nestjs/common';
import {
  ExceptionFilter,
  HttpException,
  BadRequestException,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof BadRequestException) {
      return response.status(400).json({
        error: {
          status: 'fail',
          message: exception.message,
          fields: exception.getResponse()['message'],
        },
      });
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.message;

      return response.status(status).json({
        error: {
          status: 'fail',
          message,
        },
      });
    } else {
      console.log(exception);
      return response.status(500).json({
        error: {
          message: 'Internal server error',
        },
      });
    }
  }
}