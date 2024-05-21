import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();

        //if response header content type == text/csv then return data as it is
        if (
          response.getHeader('content-type') &&
          response.getHeader('content-type').includes('text/csv')
        ) {
          return data;
        }

        if (
          response.statusCode === HttpStatus.OK ||
          response.statusCode === HttpStatus.CREATED
        ) {
          const toReturn = {
            data,
            success: true,
            message: 'Request successful',
          };

          return toReturn;
        } else {
          return {
            data,
            success: false,
            message: 'Request failed',
          };
        }
      }),
    );
  }
}
