import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Language } from 'src/language/schemas/language.schema';
import { Type } from 'class-transformer';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Language.name }])
  @Type(() => Language)
  language: Language[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: User.name }])
  @Type(() => User)
  friends: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
