import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUserInput } from './schemas/create-user.input';
import { UpdateUserInput } from './schemas/update-user.input';
import { User } from './schemas/user.entity';
import { Language } from './schemas/language.entity';
import { UsersPostgresService } from './users-postgres.service';

@Controller('users-postgres')
export class UsersPostgresController {
  constructor(private readonly userService: UsersPostgresService) {}

  @Get()
  async findAll(): Promise<User[] | void> {
    return await this.userService.findAll();
  }

  @Post('create')
  async create(@Body() createUserDto: CreateUserInput) {
    return await this.userService.create(createUserDto);
  }

  @Post('edit/:id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserInput,
  ) {
    await this.userService.update(id, updateUserDto);
  }

  @Get('edit/:id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post('delete/:id')
  async deleteOne(@Param('id') id: number) {
    await this.userService.remove(id);
  }
}
