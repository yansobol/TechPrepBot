import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { QuestionService } from '../question/question.service';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    QuestionModule
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
