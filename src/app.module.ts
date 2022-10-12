import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LanguageModule } from './language/language.module';
import { UsersGraphqlModule } from './users-graphql/users-graphql.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersPostgresModule } from './users-postgres/users-postgres.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    UserModule,
    LanguageModule,
    UsersGraphqlModule,
    UsersGraphqlModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'bob',
      password: 'admin',
      database: 'nest',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersPostgresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
