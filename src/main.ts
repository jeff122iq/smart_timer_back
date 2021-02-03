import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Seeder } from './seeders/seeders';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    const logger = app.get(Logger);
    const seeder = app.get(Seeder);

    seeder
      .seed()
      .then(() => logger.debug('Seeding complete!'))
      .catch(err => {
        logger.error('Seeding failed');
        throw err;
      });

    await app.listen(5000);
  } catch (err) {
    console.error(err);
  }
}
bootstrap();
