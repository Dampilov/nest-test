import { Injectable } from '@nestjs/common';
import { User } from './users.interfaces';

@Injectable()
export class UsersGraphqlService {
  private users: User[] = [
    { id: 1, name: 'Тимур', friendsId: [6, 2, 3] },
    { id: 2, name: 'Каск', friendsId: [1, 6, 4] },
    { id: 3, name: 'Тимур', friendsId: [4, 1, 5] },
    { id: 4, name: 'Каск', friendsId: [2, 3] },
    { id: 5, name: 'Тимур', friendsId: [3, 6] },
    { id: 6, name: 'Каск', friendsId: [1, 2, 5] },
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

  update(usersFriends: User): User {
    return this.users.find((user) => {
      if (user.id === usersFriends.id) user.friendsId = usersFriends.friendsId;
    });
  }

  findByUserId(userId: number) {
    return this.users.filter((user) => {
      return user.friendsId.find((element) => element === Number(userId));
    });
  }

  findOne(userId: number) {
    return this.users.find((user) => user.id === userId);
  }

  findAll() {
    return this.users;
  }
}
