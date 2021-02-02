import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplatesTagsService } from './templates-tags.service';
import { TemplatesTagsController } from './templates-tags.controller';
import { TemplatesTags } from './../helpers/entities/templates-tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemplatesTags])],
  providers: [TemplatesTagsService],
  controllers: [TemplatesTagsController],
})
export class TemplatesTagsModule {}
