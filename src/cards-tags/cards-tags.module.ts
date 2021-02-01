import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CardsTagsService } from './cards-tags.service';
import { CardsTags } from 'src/helpers/entities/cards-tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardsTags])],
  providers: [CardsTagsService],
})
export class CardsTagsModule {}
