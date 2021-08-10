import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './api/v1/config/ormconfig';
import { MessengerGateway } from './api/v1/messenger/messenger.gateway';
import { AuthModule } from './api/v1/auth/auth.module';
import { ConversationModule } from './api/v1/conversation/conversation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ConversationModule,
  ],
  controllers: [],
  providers: [MessengerGateway],
})
export class AppModule {}
