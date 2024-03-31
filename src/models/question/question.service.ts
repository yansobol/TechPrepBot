import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './entity/question.entity';
import { MoreThan, Repository } from 'typeorm';
import { ChatgptService } from '@src/chatgpt/chatgpt.service';
import { QuestionDto } from './dto/question.dto';

@Injectable()
export class QuestionService {
    private readonly logger: Logger
    constructor(
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>,
        private readonly gptService: ChatgptService,
    ) {
        this.logger = new Logger(QuestionService.name)
    }

    async saveQuestionsToDb() {
        try {
            const questions = await this.gptService.generateQuestions()
            const q = questions.map((question) => {
                const options = JSON.stringify(question.options)
                return { ...question, options }
            })
            console.log(questions)
            await this.questionRepository.save(q)
        } catch (error) {
            this.logger.error(error)
        }
    }

    async getQuestion(): Promise<QuestionEntity> {
        try {
            const data = await this.questionRepository.findOne({ where: { id: MoreThan(1) } })
            const options = JSON.parse(data.options)
            const question = { ...data, options }
            return question
        } catch (error) {
            this.logger.error(error)
        }
    }

    async getRandomQuestion(): Promise<QuestionEntity> {
        try {
            const randomQuestion = await this.questionRepository.createQueryBuilder().select("id")
                .orderBy("RANDOM()")
                .limit(1)
                .getOne();
            console.log(randomQuestion)
            return randomQuestion;
        } catch (error) {
            this.logger.error(error)
        }
    }

    async findById(id: number): Promise<QuestionEntity> {
        try {
            const question = await this.questionRepository.findOne({ where: { id } })
            return question
        } catch (error) {
            this.logger.error(error)
        }
    }
}
