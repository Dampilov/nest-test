import { Module } from '@nestjs/common';
import { UsersGraphqlService } from './users-graphql.service';
import { UsersGraphqlResolver } from './users-graphql.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { LanguageResolver } from './language-graphql.resolver';
import { LanguageGraphqlService } from './language-graphql.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/*.graphql'],
    }),
  ],
  providers: [
    UsersGraphqlService,
    UsersGraphqlResolver,
    LanguageResolver,
    LanguageGraphqlService,
  ],
})
export class UsersGraphqlModule {}
