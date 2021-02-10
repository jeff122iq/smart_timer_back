import { CardsTags } from './../helpers/entities/cards-tags.entity';
import { CardsTagsService } from './../cards-tags/cards-tags.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cards } from '../helpers/entities/cards.entity';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cards, CardsTags])],
  controllers: [CardsController],
  providers: [CardsService, CardsTagsService],
})
export class CardsModule {}
