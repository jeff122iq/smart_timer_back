import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { Templates } from '../helpers/entities/templates.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Templates])],
  providers: [TemplatesService],
  controllers: [TemplatesController],
})
export class TemplatesModule {}
