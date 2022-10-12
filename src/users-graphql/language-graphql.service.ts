import { Injectable } from '@nestjs/common';
import { Language } from './language-graphql.interfaces';

@Injectable()
export class LanguageGraphqlService {
  private languages: Language[] = [
    { id: 1, name: 'TS' },
    { id: 2, name: 'JS' },
    { id: 3, name: 'Python' },
    { id: 4, name: 'Java' },
    { id: 5, name: 'Haskel' },
    { id: 6, name: 'C++' },
  ];

  findOne(languageId: number) {
    return this.languages.find((language) => language.id === languageId);
  }

  findAll() {
    return this.languages;
  }

  findMany(filterLanguages: number[]): Language[] {
    return this.languages.filter((language) => {
      return filterLanguages?.find((languageId) => languageId == language.id);
    });
  }
}
