import { Injectable } from '@nestjs/common';
import { Language } from './language-graphql.interfaces';

@Injectable()
export class LanguageGraphqlService {
  private languages: Language[] = [
    { id: 1, name: 'TS', userId: [1, 2] },
    { id: 2, name: 'JS', userId: [2, 4] },
    { id: 3, name: 'Python', userId: [3, 1, 5] },
    { id: 4, name: 'Java', userId: [1, 5] },
    { id: 5, name: 'Haskel', userId: [2, 6] },
    { id: 6, name: 'C++', userId: [6] },
  ];

  findByUserId(userId: number) {
    return this.languages.filter((language) => {
      return language.userId.find((element) => element === Number(userId));
    });
  }

  findOne(languageId: number) {
    return this.languages.find((language) => language.id === languageId);
  }

  findAll() {
    return this.languages;
  }
}
