import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Users } from '../helpers/entities/users.entity';
import { CreateUserDTO } from '../helpers/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepo: Repository<Users>,
  ) {}

  async insert(user: CreateUserDTO) {
    const newUser = this.usersRepo.create(user);
    await this.usersRepo.insert(newUser);
    return HttpStatus.OK;
  }

  async findOne(email: string) {
    return await this.usersRepo.findOne({ email });
  }
}
