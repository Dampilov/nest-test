import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { Language, LanguageSchema } from 'src/language/schemas/language.schema';
import {
  UserLanguage,
  UserLanguageSchema,
} from './schemas/userLanguage.schema';
import { Friends, FriendsSchema } from './schemas/friends.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Language.name, schema: LanguageSchema },
    ]),
    MongooseModule.forFeature([
      { name: UserLanguage.name, schema: UserLanguageSchema },
    ]),
    MongooseModule.forFeature([{ name: Friends.name, schema: FriendsSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
