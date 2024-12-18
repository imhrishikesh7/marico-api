import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class StringArrayPipe implements PipeTransform {
  transform(value: any): string[] {
    if (checkStringArray(value)) {
      return value;
    }
    throw new BadRequestException('Invalid string array');
  }
}

@Injectable()
export class StringArrayOrNullPipe implements PipeTransform {
  transform(value: any): string[] | null {
    if (checkStringArray(value)) {
      return value;
    }
    return null;
  }
}

@Injectable()
export class MultiStringArrayPipe implements PipeTransform {
  transform(value: any): string[] {
    if (Array.isArray(value)) {
      const strings = [];
      for (const str of value) {
        if (typeof str !== 'string') {
          throw new BadRequestException('Invalid array item');
        }
        if (str.trim() !== '') {
          strings.push(str.trim());
        }
      }
      return strings;
    }
    return [];
  }
}

// Helper function to check if the value is a valid array of strings
const checkStringArray = (value: any): boolean => {
  if (!Array.isArray(value)) {
    return false;
  }

  for (const item of value) {
    if (typeof item !== 'string' || item.trim() === '') {
      return false;
    }
  }

  return true;
};
