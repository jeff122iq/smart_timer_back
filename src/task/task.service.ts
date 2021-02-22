import { Briefs } from './../helpers/entities/briefs.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Briefs)
    private readonly briefsRepository: Repository<Briefs>,
    private readonly logger: Logger,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.debug('Deleting briefs started ...');
    await this.briefsRepository
      .createQueryBuilder()
      .delete()
      .where('created_at <= :date', {
        date: moment().subtract(7, 'day').toDate(),
      })
      .execute();
    this.logger.debug('Deleting briefs finished');
  }
}
