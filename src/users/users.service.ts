import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Users } from '../helpers/entities/users.entity';
import { CreateUserDTO } from '../helpers/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly connection: Connection,
  ) {}

  async insert(user: CreateUserDTO) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newUser = this.usersRepository.create(user);
      const res = await this.usersRepository.insert(newUser);
      const newUserRecord = await this.usersRepository.findOne(
        res.identifiers[0].id,
      );
      await queryRunner.commitTransaction();
      return newUserRecord;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('Cannot insert user', HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(email: string) {
    return await this.usersRepository.findOne(
      { email },
      { relations: ['role'] },
    );
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOne({ id }, { relations: ['role'] });
  }
}
