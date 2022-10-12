import { Language } from './language-graphql.interfaces';

export interface User {
  id?: number;
  name: string;
  languagesId?: number[];
  languages?: Language[];
  friendsId?: number[];
  friends?: User[];
}
