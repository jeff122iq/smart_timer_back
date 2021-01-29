import { Injectable, Logger } from '@nestjs/common';

import { RolesSeederService } from './roles/roles.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly rolesSeederService: RolesSeederService,
  ) {}

  async seed() {
    await this.roles()
      .then((completed) => {
        this.logger.debug('ROLES: successfully completed seeding...');
        Promise.resolve(completed);
      })
      .catch((err) => {
        this.logger.error('Seeding failed...');
        Promise.reject(err);
      });
  }

  private async roles() {
    return await Promise.all(this.rolesSeederService.create())
      .then(() => {
        return Promise.resolve(true);
      })
      .catch((err) => Promise.reject(err));
  }
}
