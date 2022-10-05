import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LanguageDto } from './dto/language.dto';
import { Language, LanguageDocument } from './schemas/language.schema';

@Injectable()
export class LanguageService {
  constructor(
    @InjectModel(Language.name) private languageModel: Model<LanguageDocument>,
  ) {}

  async create(createLanguageDto: LanguageDto): Promise<Language> {
    const createUser = new this.languageModel(createLanguageDto);
    return createUser.save();
  }

  async findAll(): Promise<Language[]> {
    return this.languageModel.find().exec();
  }

  async findOne(_id: string): Promise<Language> {
    return this.languageModel.findById({ _id }).exec();
  }

  async updateOne(
    _id: string,
    updateLanguageDto: LanguageDto,
  ): Promise<Language> {
    return this.languageModel
      .findByIdAndUpdate(_id, updateLanguageDto)
      .setOptions({ overwrite: true, new: true });
  }

  async deleteOne(_id: string): Promise<Language> {
    return this.languageModel.findByIdAndDelete(_id);
  }
}
