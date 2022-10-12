import { Inject, Injectable } from '@nestjs/common';
import { Language } from './schemas/language.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLanguageInput } from './schemas/create-language.input';

@Injectable()
export class LanguagePostgresService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  async create(newlanguage: CreateLanguageInput): Promise<Language> {
    const language = this.languageRepository.create(newlanguage);
    return await this.languageRepository.save(language);
  }

  async findAll(): Promise<Language[]> {
    return await this.languageRepository.find();
  }

  async findOne(id: number): Promise<Language> {
    return await this.languageRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.languageRepository.delete(id);
  }
}
