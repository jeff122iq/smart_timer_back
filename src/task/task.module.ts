import { Briefs } from './../helpers/entities/briefs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Logger } from '@nestjs/common';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Briefs])],
  providers: [TaskService, Logger],
})
export class TaskModule {}
