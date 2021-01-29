import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Seeder } from './seeders/seeders';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const logger = app.get(Logger);
    const seeder = app.get(Seeder);

    seeder
      .seed()
      .then(() => logger.debug('Seeding complete!'))
      .catch(err => {
        logger.error('Seeding failed');
        throw err;
      });

    await app.listen(3000);
  } catch (err) {
    console.error(err);
  }
}
bootstrap();
