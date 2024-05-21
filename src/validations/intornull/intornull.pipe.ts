import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IntOrNullPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  transform(value: any): number | null {
    //if value is string
    if (typeof value === 'string') {
      //check if string is number
      if (!value.match(/^[0-9]+$/)) {
        return null;
      }
      return parseInt(value);
    }
    //if value is number
    if (typeof value === 'number') {
      return value;
    }
    return null;
  }
}
