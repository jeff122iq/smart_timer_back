import { TemplatesTags } from './../helpers/entities/templates-tags.entity';
import { Module } from '@nestjs/common';
import { TemplatesTagsService } from './templates-tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TemplatesTags])],
  providers: [TemplatesTagsService],
})
export class TemplatesTagsModule {}
