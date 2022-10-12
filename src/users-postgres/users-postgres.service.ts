import { Inject, Injectable } from '@nestjs/common';
import { User } from './schemas/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './schemas/create-user.input';
import { UpdateUserInput } from './schemas/update-user.input';
import { Language } from './schemas/language.entity';

@Injectable()
export class UsersPostgresService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Language) private languageepository: Repository<User>,
  ) {}

  async create(newUser: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(newUser);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    console.log(await this.userRepository.find({}));
    return await this.userRepository.find({});
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['friends', 'languages'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.softDelete(id);
  }

  async update(userId: number, usersUpdate: UpdateUserInput): Promise<User> {
    console.log(usersUpdate);
    const updatedUser = await this.userRepository.findOneBy({ id: userId });
    if (updatedUser) {
      if (usersUpdate.name) updatedUser.name = usersUpdate.name;
      if (usersUpdate.friends) updatedUser.friends = usersUpdate.friends;
      if (usersUpdate.languages) updatedUser.languages = usersUpdate.languages;
      return this.userRepository.save(updatedUser);
    }
  }

  async findUsersFriends(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        friends: true,
      },
    });
  }

  async findUsersLanguages(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        languages: true,
      },
    });
  }
}
