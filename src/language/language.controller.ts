import { Body, Controller, Get, Param, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { LanguageDto } from './dto/language.dto';
import { LanguageService } from './language.service';
import { Language } from './schemas/language.schema';

@Controller('languages')
export class LanguageController {
  constructor(private readonly LanguageService: LanguageService) {}

  @Get()
  @Render('languages')
  async findAll(): Promise<Language[]> {
    return this.LanguageService.findAll();
  }

  @Post('create')
  async create(@Body() createLanguageDto: LanguageDto, @Res() res: Response) {
    await this.LanguageService.create(createLanguageDto);
    res.status(302).redirect('/languages');
  }

  @Get('create')
  createPage(@Res() res: Response) {
    return res.render('create-language', {});
  }

  @Post('edit/:id')
  async update(
    @Param('id') id: string,
    @Body() updateLanguageDto: LanguageDto,
    @Res() res: Response,
  ) {
    this.LanguageService.updateOne(id, updateLanguageDto);
    res.status(302).redirect('/languages');
  }

  @Get('edit/:id')
  @Render('edit-language')
  async findOne(@Param('id') id: string): Promise<Language> {
    return this.LanguageService.findOne(id);
  }

  @Post('delete/:id')
  async deleteOne(@Param('id') id: string, @Res() res: Response) {
    this.LanguageService.deleteOne(id);
    res.status(302).redirect('/languages');
  }
}
