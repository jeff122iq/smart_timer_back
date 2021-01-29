import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Roles } from '../helpers/entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
})
export class RolesModule {}
