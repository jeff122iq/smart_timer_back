import { BriefsCards } from './../helpers/entities/briefs-cards.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BriefsCardsService } from './briefs-cards.service';

@Module({
  imports:[TypeOrmModule.forFeature([BriefsCards])],
  providers: [BriefsCardsService]
})
export class BriefsCardsModule {}
