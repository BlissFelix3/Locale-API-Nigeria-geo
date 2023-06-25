import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return { status: true, msg: 'Locale API Application' };
  }
}
