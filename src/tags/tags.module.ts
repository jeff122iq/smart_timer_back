import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Tags } from '../helpers/entities/tags.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Tags])],
    providers: [TagsService],
    controllers: [TagsController]
})
export class TagsModule {}
