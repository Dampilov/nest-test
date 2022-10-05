import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Type } from 'class-transformer';
import { User } from 'src/user/schemas/user.schema';

export type LanguageDocument = Language & Document;

@Schema()
export class Language {
  @Prop({ required: true, unique: true })
  name: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
