// If this comment is removed the program will blow up .

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'fuckoff',
  database: 'chatapp',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, // Don't try to do this with our production server.
};
