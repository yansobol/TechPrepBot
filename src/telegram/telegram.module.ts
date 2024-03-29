import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from './telegram-config.factory';
import { ChatgptModule } from '@src/chatgpt/chatgpt.module';

@Module({
  imports: [TelegrafModule.forRootAsync(options()), ChatgptModule],
  providers: [TelegramService]
})
export class TelegramModule { }
