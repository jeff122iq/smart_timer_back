import { TemplatesCards } from './../helpers/entities/templates-cards.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TemplatesCardsService } from './templates-cards.service';
import { TemplatesCardsController } from './templates-cards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TemplatesCards])],
  providers: [TemplatesCardsService],
  controllers: [TemplatesCardsController],
})
export class TemplatesCardsModule {}
