import { Test, TestingModule } from '@nestjs/testing';
import { UsersGraphqlResolver } from './users-graphql.resolver';

describe('UsersGraphqlResolver', () => {
  let resolver: UsersGraphqlResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersGraphqlResolver],
    }).compile();

    resolver = module.get<UsersGraphqlResolver>(UsersGraphqlResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
