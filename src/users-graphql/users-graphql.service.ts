import { Inject, Injectable } from '@nestjs/common';
import { User } from './schemas/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './schemas/create-user.input';
import { UpdateUserInput } from './schemas/update-user.input';

@Injectable()
export class UsersGraphqlService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(newUser: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(newUser);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async update(
    userId: number,
    usersUpdate: UpdateUserInput,
  ): Promise<User> {
    const user = await this.userRepository.preload({
      id: userId,
      ...usersUpdate,
    });
    return this.userRepository.save(user);
  }

  async findUsersFriends(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        friends: true,
      }
    });
  }

  async findUsersLanguages(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        languages: true,
      }
    });
  }
}
