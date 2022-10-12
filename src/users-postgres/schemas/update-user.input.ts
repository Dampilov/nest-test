import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { Language } from './language.entity';
import { User } from './user.entity';

@InputType()
export class UpdateUserInput extends CreateUserInput {
  @Field(() => Int)
  id: number;

  @Field(() => [Language])
  languages?: Language[];

  @Field(() => [User])
  friends?: User[];
}
