import { Language } from './language-graphql.interfaces';

export interface User {
  id?: number;
  name: string;
  languages?: Language[];
  friendsId: number[];
  friends?: User[];
}
