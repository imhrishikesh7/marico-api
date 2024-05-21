import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImagefilePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  transform(value: any): {
    url: string;
    width: number;
    height: number;
  } {
    if (checkImageFileObject(value)) {
      return value;
    }
    throw new BadRequestException('Invalid file');
  }
}
@Injectable()
export class ImagefileOrNullPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  transform(value: any): {
    url: string;
    width: number;
    height: number;
  } | null {
    if (checkImageFileObject(value)) {
      return value;
    }
    return null;
  }
}

@Injectable()
export class MultiImagefilePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  transform(value: any): {
    url: string;
    width: number;
    height: number;
  }[] {
    if (Array.isArray(value)) {
      const images = [];
      for (const image of value) {
        if (typeof image !== 'object') {
          throw new BadRequestException('Invalid images');
        }
        //if image is an empty object
        if (Object.keys(image).length === 0) {
          continue;
        }

        if (checkImageFileObject(image)) {
          images.push(image);
        } else {
          // throw new BadRequestException("Invalid image");
        }
      }
      return images;
    }
    return [];
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const checkImageFileObject = (value: any): boolean => {
  if (typeof value !== 'object') {
    return false;
  }

  if (!value) {
    return false;
  }

  //check if file has url
  if (!value.url || value.url == '') {
    return false;
  }

  //check if file has width
  if (!value.width) {
    return false;
  }

  //check if file has height
  if (!value.height) {
    return false;
  }

  //if width, height, duration is a string, convert it to number
  try {
    if (typeof value.width === 'string') {
      value.width = parseInt(value.width);
    }

    if (typeof value.height === 'string') {
      value.height = parseInt(value.height);
    }
  } catch (error) {
    return false;
  }
  return true;
};
