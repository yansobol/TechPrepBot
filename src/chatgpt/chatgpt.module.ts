import { Module } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  exports: [ChatgptService],
  providers: [ChatgptService],
})
export class ChatgptModule { }
