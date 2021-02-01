import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BriefsService } from './briefs.service';
import { BriefsController } from './briefs.controller';
import { Briefs } from '../helpers/entities/briefs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Briefs])],
  providers: [BriefsService],
  controllers: [BriefsController],
})
export class BriefsModule {}
