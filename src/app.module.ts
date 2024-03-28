import { Module } from '@nestjs/common';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [ChatgptModule, TelegramModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
