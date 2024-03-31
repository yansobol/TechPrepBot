import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, catchError, map, of } from 'rxjs';
import { chatgptResponse } from './interface/chatgpt.interface';
import { questionsFromChatGpt } from '@src/database/dataFromChatGpt';
import { QuestionDto } from '@src/models/question/dto/question.dto';

@Injectable()
export class ChatgptService {
    private readonly logger = new Logger(ChatgptService.name)

    constructor(private readonly config: ConfigService, private readonly http: HttpService) { }

    generateResponse(promt: string): Observable<string> {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.get('OPENAI_API_KEY')}`
        }
        const data = {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: promt }],
            temperature: 1
        }
        return this.http
            .post<chatgptResponse>(this.config.get('CHATGPT_URL'), data, { headers })
            .pipe(map(({ data }) => data.choices[0].message.content.trim()),
                catchError((error) => {
                    this.logger.error(error)
                    return of('Error on getting response from ChatGpt')
                })
            )
    }

    async generateQuestions(): Promise<QuestionDto[]> {
        const response = this.generateResponse('df')
        return questionsFromChatGpt
    }

    async getQuestion(): Promise<QuestionDto> {
        const randomIndex = Math.floor(Math.random() * questionsFromChatGpt.length)
        return questionsFromChatGpt[randomIndex]
    }
}
