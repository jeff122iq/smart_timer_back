import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BriefsCardsService } from './briefs-cards.service';
import { BriefsCardsController } from './briefs-cards.controller';
import { BriefsCards } from './../helpers/entities/briefs-cards.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BriefsCards])],
  providers: [BriefsCardsService],
  controllers: [BriefsCardsController]
})
export class BriefsCardsModule {}
