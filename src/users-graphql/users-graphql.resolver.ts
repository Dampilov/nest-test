import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { LanguageGraphqlService } from './language-graphql.service';
import { UsersGraphqlService } from './users-graphql.service';
import { User } from './users.interfaces';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('User')
export class UsersGraphqlResolver {
  constructor(
    private readonly userService: UsersGraphqlService,
    private readonly languageService: LanguageGraphqlService,
  ) {}

  @Query('user')
  findUser(@Args({ name: 'id', type: () => ID }) id: number) {
    return this.userService.findOne(id);
  }

  @Query('users')
  getUsers() {
    return this.userService.findAll();
  }

  @ResolveField()
  languages(@Parent() user: User): any {
    return this.userService.findLanguages(user);
  }

  @ResolveField()
  friends(@Parent() user: User): any {
    return this.userService.findFriends(user.id);
  }

  // API

  @Mutation('createUser')
  async create(@Args('createUserInput') user: User) {
    const createdUser = this.userService.create(user);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Mutation('deleteUser')
  async deleteOne(@Args('deleteUserInput') user: User) {
    const deletedUser = this.userService.delete(user.id);
    pubSub.publish('userDeleted', { userDeleted: deletedUser });
    return deletedUser;
  }

  @Mutation('updateUser')
  async updateOne(@Args('updateUserInput') user: User) {
    const updatedUser = this.userService.update(user);
    pubSub.publish('userUpdated', { userUpdated: updatedUser });
    this.friends(user);
    return updatedUser;
  }

  @Subscription('userCreated')
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }

  @Subscription('userDeleted')
  userDeleted() {
    return pubSub.asyncIterator('userDeleted');
  }

  @Subscription('userUpdated')
  userUpdated() {
    return pubSub.asyncIterator('userUpdated');
  }
}
