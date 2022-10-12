import { Module } from '@nestjs/common';
import { UsersPostgresService } from './users-postgres.service';
import { UsersPostgresController } from './users-postgres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './schemas/user.entity';
import { Language } from './schemas/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Language])],
  providers: [UsersPostgresService],
  controllers: [UsersPostgresController],
})
export class UsersPostgresModule {}
