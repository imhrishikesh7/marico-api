import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { DateUtil } from '../../lib/utility';

@Injectable()
export class ParseDateTimePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  transform(value: any, metadata: ArgumentMetadata): Date {
    if (typeof value === 'string') {
      try {
        if (value == 'today') {
          const date = new Date();
          return date;
        }

        const date = DateUtil.dateTimeObjectFromMySQLDateTime(value);
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
