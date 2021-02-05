import { TemplatesCardsService } from './../templates-cards/templates-cards.service';
import { TemplatesCards } from './../helpers/entities/templates-cards.entity';
import { Cards } from './../helpers/entities/cards.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { Templates } from '../helpers/entities/templates.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Templates, Cards, TemplatesCards])],
  providers: [TemplatesService, TemplatesCardsService],
  controllers: [TemplatesController],
})
export class TemplatesModule {}
