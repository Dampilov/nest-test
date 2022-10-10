import { Test, TestingModule } from '@nestjs/testing';
import { UsersGraphqlService } from './users-graphql.service';

describe('UsersGraphqlService', () => {
  let service: UsersGraphqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersGraphqlService],
    }).compile();

    service = module.get<UsersGraphqlService>(UsersGraphqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
