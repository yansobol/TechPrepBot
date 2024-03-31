import { Module } from '@nestjs/common';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './models/user/user.module';
import { QuestionModule } from './models/question/question.module';

@Module({
  imports: [ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
    envFilePath: ['.env']
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: Number(configService.get<number>('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [__dirname + '/models/**/entity/*.entity{.js, .ts}'],
      synchronize: true,
    }),
    inject: [ConfigService],
  }),
    UserModule,
    QuestionModule,
    ChatgptModule,
    TelegramModule,
    UserModule,
    QuestionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
