import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmailPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  transform(value: any, metadata: ArgumentMetadata): string {
    if (typeof value === 'string') {
      //check if the string is empty
      if (value.trim().length === 0) {
        throw new BadRequestException(`${metadata.data} should not be empty`);
      }

      //check if the string is valid email
      if (!value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        throw new BadRequestException(`${metadata.data} is not valid`);
      }

      return value.trim();
    }
    throw new BadRequestException(`Bad Input for ${metadata.data} + "`);
  }
}
