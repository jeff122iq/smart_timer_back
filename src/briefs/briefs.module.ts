import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BriefsService } from './briefs.service';
import { BriefsController } from './briefs.controller';
import { CardsService } from './../cards/cards.service';
import { Cards } from 'src/helpers/entities/cards.entity';
import { Briefs } from '../helpers/entities/briefs.entity';
import { BriefsCards } from './../helpers/entities/briefs-cards.entity';
import { BriefsCardsService } from './../briefs-cards/briefs-cards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Briefs, Cards, BriefsCards]),
  ],
  providers: [BriefsService, BriefsCardsService],
  controllers: [BriefsController],
})
export class BriefsModule {}
