import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Templates } from '../helpers/entities/templates.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Templates])],
})
export class TemplatesModule {}
