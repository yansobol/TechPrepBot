import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from './telegram-config.factory';
import { ChatgptModule } from '@src/chatgpt/chatgpt.module';
import { QuestionModule } from '@src/models/question/question.module';

@Module({
  imports: [TelegrafModule.forRootAsync(options()),
    ChatgptModule,
    QuestionModule
  ],
  providers: [TelegramService]
})
export class TelegramModule { }
