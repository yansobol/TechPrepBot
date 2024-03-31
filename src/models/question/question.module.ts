import { Module, forwardRef } from '@nestjs/common';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './entity/question.entity';
import { UserModule } from '../user/user.module';
import { ChatgptModule } from '@src/chatgpt/chatgpt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity]),
    ChatgptModule
  ],
  providers: [QuestionService],
  exports: [QuestionService]
})
export class QuestionModule { }
