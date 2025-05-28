import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SwitchPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  transform(value: any): boolean {
    // if (typeof value === 'string') {
    //   if (
    //     value.trim().toLowerCase() === 'true' ||
    //     value.trim().toLowerCase() === 'on'
    //   ) {
    //     return true;
    //   }
    // }
    if (value === true) {
      return true;
    }
    return false;
  }
}
