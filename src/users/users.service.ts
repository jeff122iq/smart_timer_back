import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Users } from '../helpers/entities/users.entity';
import { CreateUserDTO } from '../helpers/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
  ) {}

  async insert(user: CreateUserDTO) {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.insert(newUser);
    return HttpStatus.OK;
  }

  async findOne(email: string) {
    return await this.usersRepository.findOne({ email });
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOne({ id }, { relations: ['role'] });
  }
}
