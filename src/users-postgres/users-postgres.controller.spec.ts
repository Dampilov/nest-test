import { Test, TestingModule } from '@nestjs/testing';
import { UsersPostgresController } from './users-postgres.controller';

describe('UsersPostgresController', () => {
  let controller: UsersPostgresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersPostgresController],
    }).compile();

    controller = module.get<UsersPostgresController>(UsersPostgresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
