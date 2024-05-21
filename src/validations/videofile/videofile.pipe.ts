import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class VideofilePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  transform(value: any): {
    url: string;
    width: number;
    height: number;
    thumbnail: string;
    duration: number;
  } {
    if (checkVideoFileObject(value)) {
      return value;
    }
    throw new BadRequestException('Invalid video');
  }
}

@Injectable()
export class VideofileOrNullPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  transform(value: any): {
    url: string;
    width: number;
    height: number;
    thumbnail: string;
    duration: number;
  } | null {
    if (checkVideoFileObject(value)) {
      return value;
    }
    return null;
  }
}

@Injectable()
export class MultiVideofilePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  transform(value: any): {
    url: string;
    width: number;
    height: number;
    thumbnail: string;
    duration: number;
  }[] {
    if (Array.isArray(value)) {
      const videos = [];
      for (const video of value) {
        if (typeof video !== 'object') {
          throw new BadRequestException('Invalid videos');
        }
        //if video is an empty object
        if (Object.keys(video).length === 0) {
          continue;
        }

        if (checkVideoFileObject(video)) {
          videos.push(video);
        } else {
          throw new BadRequestException('Invalid video');
        }
      }
      return videos;
    }
    throw new BadRequestException('Invalid video');
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const checkVideoFileObject = (value: any): boolean => {
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

  //check if file has thumbnail
  if (!value.thumbnail) {
    return false;
  }

  //if file has duration
  if (!value.duration) {
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

    if (typeof value.duration === 'string') {
      value.duration = parseInt(value.duration);
    }
  } catch (error) {
    return false;
  }
  return true;
};
