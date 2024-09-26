import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParticipantRegistryModule } from './participant-registy/participant-registy.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ParticipantRegistryModule, ChatModule,MongooseModule.forRoot("mongodb://db:27017/chatbot",{
    user: 'poliark',
    pass: 'poliark',
    authSource: 'admin',
  })],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {}
