import { Test, TestingModule } from '@nestjs/testing';
import { UsersPostgresService } from './users-postgres.service';

describe('UsersPostgresService', () => {
  let service: UsersPostgresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersPostgresService],
    }).compile();

    service = module.get<UsersPostgresService>(UsersPostgresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
