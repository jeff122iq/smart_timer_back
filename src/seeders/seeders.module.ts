import { Module, Logger } from '@nestjs/common';

import { Seeder } from './seeders';
import { RolesSeederModule } from './roles/roles.module';

@Module({
  imports: [RolesSeederModule],
  providers: [Logger, Seeder],
})
export class SeedersModule {}
