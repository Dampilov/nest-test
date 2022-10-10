import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { LanguageGraphqlService } from './language-graphql.service';

@Resolver('Language')
export class LanguageResolver {
  constructor(private readonly languageService: LanguageGraphqlService) {}

  @Query('language')
  findPost(@Args({ name: 'id', type: () => ID }) id: number) {
    return this.languageService.findOne(id);
  }

  @Query('languages')
  getLanguages() {
    return this.languageService.findAll();
  }
}
