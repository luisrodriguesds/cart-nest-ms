import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class MicroservicesExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.status ? 400 : 500;
    const message = exception.message
      ? exception.message
      : 'Internal Error. Please, try later.';

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
