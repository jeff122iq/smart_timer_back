import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cards } from '../helpers/entities/cards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cards])],
})
export class CardsModule {}
