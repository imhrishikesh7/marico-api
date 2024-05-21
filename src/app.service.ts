import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): object {
    return {
      name: process.env.PROJECTID,
    };
  }
}
