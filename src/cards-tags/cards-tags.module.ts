import { Cards } from './../helpers/entities/cards.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardsTagsService } from './cards-tags.service';
import { CardsTagsController } from './cards-tags.controller';
import { CardsTags } from 'src/helpers/entities/cards-tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardsTags, Cards])],
  providers: [CardsTagsService],
  controllers: [CardsTagsController],
})
export class CardsTagsModule {}
