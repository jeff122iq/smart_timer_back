import { Module } from '@nestjs/common';
import { CardsTagsService } from './cards-tags.service';

@Module({
  providers: [CardsTagsService]
})
export class CardsTagsModule {}
