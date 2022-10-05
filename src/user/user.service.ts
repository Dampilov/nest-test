import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import {
  Language,
  LanguageDocument,
} from 'src/language/schemas/language.schema';
import {
  UserLanguage,
  UserLanguageDocument,
} from './schemas/userLanguage.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Language.name) private languageModel: Model<LanguageDocument>,
    @InjectModel(UserLanguage.name)
    private userLanguageModel: Model<UserLanguageDocument>,
  ) {}

  async create(createUserDto: UserDto): Promise<User> {
    /* const languages = createUserDto.language.split(/[, ]+/);
    languages.forEach((language) => {
      languageModel.find({ name: language });
    }); */

    let languageField = await this.languageModel.findOne({
      name: createUserDto.language,
    });
    if (languageField == null) {
      languageField = new this.languageModel({
        name: createUserDto.language,
      });
    }
    const user = {
      name: createUserDto.name,
      language: languageField,
    };
    const createdUser = new this.userModel(user);
    const createdField = new this.userLanguageModel({
      user: createdUser,
      language: languageField,
    });
    languageField.save();
    createdField.save();
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('language').exec();
  }

  async findOne(_id: string): Promise<User> {
    return this.userModel.findById({ _id }).exec();
  }

  async updateOne(_id: string, updateUserDto: UserDto): Promise<User> {
    const user = {
      name: updateUserDto.name,
      language: updateUserDto.language?.split(/[, ]+/),
    };
    return this.userModel
      .findByIdAndUpdate(_id, user)
      .setOptions({ overwrite: true, new: true });
  }

  async deleteOne(_id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(_id);
  }
}
