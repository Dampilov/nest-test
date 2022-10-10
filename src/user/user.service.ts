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
import { Friends } from './schemas/friends.schema';
import { FriendDto } from './dto/friend.dtp';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Language.name) private languageModel: Model<LanguageDocument>,
    @InjectModel(UserLanguage.name)
    private userLanguageModel: Model<UserLanguageDocument>,
    @InjectModel(Friends.name) private friendsModel: Model<LanguageDocument>,
  ) {}

  async create(createUserDto: UserDto): Promise<User> {
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
    return await this.userModel
      .find()
      .populate('language')
      .populate('friends')
      .exec();
  }

  async findOne(_id: string): Promise<User> {
    return this.userModel.findById({ _id }).populate('language').exec();
  }

  async updateOne(_id: string, updateUserDto: UserDto): Promise<User> {
    const user = {
      name: updateUserDto.name,
    };
    return this.userModel
      .findByIdAndUpdate(_id, user)
      .setOptions({ overwrite: true, new: true });
  }

  async deleteOne(_id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(_id);
  }

  async removeLanguage(_id: string, updateUserDto: UserDto): Promise<User> {
    const user = await this.userModel.findById(_id).populate('language').exec();
    const language = await this.languageModel.findOne({
      name: updateUserDto.language,
    });
    await user.updateOne({ $pullAll: { language: [{ _id: language._id }] } });
    user.save();
    return await this.userLanguageModel.findOneAndDelete({
      user: user,
      language: language,
    });
  }

  async addLanguage(_id: string, updateUserDto: UserDto): Promise<User> {
    const user = await this.userModel.findById(_id);
    let language = await this.languageModel.findOne({
      name: updateUserDto?.language,
    });
    if (language == null) {
      language = new this.languageModel({
        name: updateUserDto.language,
      });
    }
    const userLanguage = new this.userLanguageModel({
      user: user,
      language: language,
    });
    user.language.push(language);
    userLanguage.save();
    language.save();
    return user.save();
  }

  async addFriend(_id: string, friendDto: FriendDto): Promise<User> {
    const user = await this.userModel.findById(_id);
    const friend = await this.userModel.findOne({ name: friendDto.friends });
    if (user && friend) {
      user.friends.push(friend);
      user.save();
      friend.friends.push(user);
      friend.save();
    }
    return user.populate('friends');
  }

  async removeFriend(_id: string, friendDto: FriendDto): Promise<User> {
    const user = await this.userModel.findById(_id);
    const friend = await this.userModel.findOne({ name: friendDto.friends });
    if (user && friend) {
      await user.updateOne({ $pullAll: { friends: [{ _id: friend._id }] } });
      user.save();
      await friend.updateOne({ $pullAll: { friends: [{ _id: user._id }] } });
      friend.save();
    }
    return user.populate('friends');
  }
}
