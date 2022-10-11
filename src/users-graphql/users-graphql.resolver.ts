import {
  Args,
  Int,
  Mutation,
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
  findUser(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Query('users')
  getUsers() {
    return this.userService.findAll();
  }

  @ResolveField('languages')
  public languages(): any {
    return this.userService.findUsersLanguages();
  }

  @ResolveField('friends')
  public friends(): any {
    return this.userService.findUsersFriends();
  }

  // API

  @Mutation('createUser')
  async create(@Args('createUserInput') user: User) {
    return this.userService.create(user);
  }

  @Mutation('deleteUser')
  async deleteOne(@Args('deleteUserInput') user: User) {
    const deletedUser = this.userService.remove(user.id);
    pubSub.publish('userDeleted', { userDeleted: deletedUser });
    return deletedUser;
  }

  @Mutation('updateUser')
  async updateOne(@Args('updateUserInput') user: User) {
    const updatedUser = this.userService.update(user.id, user);
    pubSub.publish('userUpdated', { userUpdated: updatedUser });
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
