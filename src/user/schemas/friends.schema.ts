import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Type } from 'class-transformer';
import { User } from './user.schema';

export type FriendsDocument = Friends & Document;

@Schema()
export class Friends {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  friend: User;
}

export const FriendsSchema = SchemaFactory.createForClass(Friends);
