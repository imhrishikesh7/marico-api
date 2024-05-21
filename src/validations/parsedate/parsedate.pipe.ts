import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { DateUtil } from '../../lib/utility';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  transform(value: any, metadata: ArgumentMetadata): Date {
    if (typeof value === 'string') {
      try {
        if (value == 'today') {
          const date = new Date();
          return date;
        } else if (value == 'month_before') {
          const date = new Date();
          date.setMonth(date.getMonth() - 1);
          return date;
        }

        const date = DateUtil.dateObjectFromMySQLDate(value);
        return date;
      } catch (error) {
        throw new BadRequestException(
          `${metadata.data} should be a valid date`,
        );
      }
    }
    throw new BadRequestException(`Bad Input for ${metadata.data} + "`);
  }
}
