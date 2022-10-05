import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Language } from 'src/language/schemas/language.schema';
import { Type } from 'class-transformer';
import { User } from './user.schema';

export type UserLanguageDocument = UserLanguage & Document;

@Schema()
export class UserLanguage {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Language.name })
  @Type(() => User)
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Language.name })
  @Type(() => Language)
  language: Language;
}

export const UserLanguageSchema = SchemaFactory.createForClass(UserLanguage);
