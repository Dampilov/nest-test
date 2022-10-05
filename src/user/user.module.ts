import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { Language, LanguageSchema } from 'src/language/schemas/language.schema';
import { UserLanguage, UserLanguageSchema } from './schemas/userLanguage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Language.name, schema: LanguageSchema },
    ]),
    MongooseModule.forFeature([
      { name: UserLanguage.name, schema: UserLanguageSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
