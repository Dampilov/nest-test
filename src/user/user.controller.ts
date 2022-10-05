import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  //@Render('users')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('create')
  async create(@Body() createUserDto: UserDto, @Res() res: Response) {
    await this.userService.create(createUserDto);
    res.status(302).redirect('/users');
  }

  @Get('create')
  createPage(@Res() res: Response) {
    return res.render('create-user', {});
  }

  @Post('edit/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UserDto,
    @Res() res: Response,
  ) {
    this.userService.updateOne(id, updateUserDto);
    res.status(302).redirect('/users');
  }

  @Get('edit/:id')
  @Render('edit-user')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('delete/:id')
  async deleteOne(@Param('id') id: string, @Res() res: Response) {
    this.userService.deleteOne(id);
    res.status(302).redirect('/users');
  }
}
