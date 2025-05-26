import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SlugPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  transform(value: any, metadata: ArgumentMetadata): string {
    if (typeof value === 'string') {
      //check if the string is empty
      if (value.trim().length === 0) {
        throw new BadRequestException(`${metadata.data} should not be empty`);
      }

      //check if the string is a valid slug (allow /)
      const regex = new RegExp('^[a-z0-9-/]*$');
      if (!regex.test(value)) {
        throw new BadRequestException(
          `${metadata.data} should only contain lowercase letters, numbers, - and /`,
        );
      }

      return value.trim();
    }
    throw new BadRequestException(`Bad Input for ${metadata.data} + "`);
  }
}
export class SlugPipeOptional implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  transform(value: any, metadata: ArgumentMetadata): string {
    if (typeof value === 'string') {
      //check if the string is empty
      if (value.trim().length === 0) {
        return value.trim();
      }

      //check if the string is a valid slug (allow /)
      const regex = new RegExp('^[a-z0-9-/]*$');
      if (!regex.test(value)) {
        throw new BadRequestException(
          `${metadata.data} should only contain lowercase letters, numbers, - and /`,
        );
      }

      return value.trim();
    }
    throw new BadRequestException(`Bad Input for ${metadata.data} + "`);
  }
}
