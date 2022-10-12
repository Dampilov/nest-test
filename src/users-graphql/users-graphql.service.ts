import { Injectable } from '@nestjs/common';
import { LanguageGraphqlService } from './language-graphql.service';
import { User } from './users.interfaces';

@Injectable()
export class UsersGraphqlService {
  constructor(private languageService: LanguageGraphqlService) {}

  private users: User[] = [
    { id: 1, name: 'Тимур', friendsId: [6, 2, 3], languagesId: [1, 2, 3] },
    { id: 2, name: 'Каск', friendsId: [1, 6, 4], languagesId: [4, 2, 3] },
    { id: 3, name: 'Тимур', friendsId: [4, 1, 5], languagesId: [5, 2, 1] },
    { id: 4, name: 'Каск', friendsId: [2, 3], languagesId: [1, 2, 3] },
    { id: 5, name: 'Тимур', friendsId: [3, 6], languagesId: [1, 2, 3] },
    { id: 6, name: 'Каск', friendsId: [1, 2, 5], languagesId: [1, 2, 3] },
  ];

  create(user: User): User {
    user.id = this.users.length + 1;
    this.users.push(user);
    return user;
  }

  delete(userId: number): User {
    const deletedUser = this.users.find((user) => user.id === userId);
    const index = this.users.indexOf(deletedUser);
    this.users.splice(index, 1);
    return deletedUser;
  }

  update(usersUpdate: User): User {
    return this.users.find((user) => {
      if (user.id === usersUpdate.id) {
        if (usersUpdate.name) user.name = usersUpdate.name;
        if (usersUpdate.friendsId) user.friendsId = usersUpdate.friendsId;
        if (usersUpdate.languagesId) user.languagesId = usersUpdate.languagesId;
        return user;
      }
    });
  }

  findFriends(userId: number) {
    return this.users.filter((user) => {
      return user.friendsId?.find((element) => element === Number(userId));
    });
  }

  findLanguages(user: User) {
    return this.languageService.findMany(user.languagesId);
  }

  findOne(userId: number) {
    return this.users.find((user) => user.id === userId);
  }

  findAll() {
    return this.users;
  }
}
