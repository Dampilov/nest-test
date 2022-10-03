import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LanguageModule } from './language/language.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest'), UserModule, LanguageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
