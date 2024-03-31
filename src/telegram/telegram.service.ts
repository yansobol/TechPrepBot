import { Action, Command, Ctx, Hears, InjectBot, Message, On, Start, Update } from "nestjs-telegraf";
import { Markup, Scenes, Telegraf } from "telegraf";
import { actionButtons2, actionButtons3, frameworkButtons, questionButtons, langButtons } from "./buttons";
import { ConfigService } from "@nestjs/config";
import { ChatgptService } from "@src/chatgpt/chatgpt.service";
import { QuestionService } from "@src/models/question/question.service";
import { Logger } from "@nestjs/common";
import { isValidJson } from "@src/utils";


type Context = Scenes.SceneContext

@Update()
export class TelegramService {
    private readonly logger: Logger
    constructor(private readonly config: ConfigService,
        @InjectBot() private readonly bot: Telegraf<Context>,
        private readonly chatGpt: ChatgptService,
        private readonly questionService: QuestionService

    ) {
        this.logger = new Logger(TelegramService.name)
    }

    async openMenu(status: boolean) {
        console.log('menu status: ', status)
        if (status) {
            await this.bot.telegram.setMyCommands([
                { command: '/interview', description: 'Start with the interview' },
                { command: '/profile', description: 'See your profile' },
                { command: '/edit', description: 'Edit you profile' },
            ])
        }
        else await this.bot.telegram.deleteMyCommands()
    }

    @Start()
    async onStart() {
        await this.openMenu(true)
    }

    @Command('interview')
    async onInterview(@Ctx() ctx: Context) {
        console.log('interview')
        const question = await this.questionService.getQuestion()
        console.log(question)
        await ctx.replyWithHTML(question.text, questionButtons(question.id))
    }

    @Command('profile')
    async profile(@Ctx() ctx: Context) {
        console.log('profile')
        await ctx.reply('👋 Hello, Choose language!', langButtons())
    }

    @Command('edit')
    async editProfile(@Ctx() ctx: Context) {
        console.log('edit')
    }

    @On('callback_query')
    async sendAnswer(@Ctx() ctx: Context) {
        try {
            console.log(ctx)
            let question = undefined
            const data = ctx.callbackQuery?.['data']
            if (!isNaN(Number(data))) {
                const id = Number(data)
                question = await this.questionService.findById(id)
                ctx.replyWithHTML(`${question.answer} \n\n <a>${question.learnMore}</a>`)
                await ctx.answerCbQuery()
            }
            else if (data === 'next') this.getNextQuestion(ctx)
        } catch (error) {
            this.logger.error(error)
        }
    }

    async getNextQuestion(@Ctx() ctx: Context) {
        console.log('getNextQuestion:')
        const question = await this.questionService.getRandomQuestion()
        console.log(question)
        await ctx.replyWithHTML(question.text, questionButtons(question.id))
        await ctx.answerCbQuery()
    }

    @Action(['java', 'go', 'python'])
    async onAction(@Ctx() ctx: Context) {
        console.log('inlineActionButtons:')
        await ctx.editMessageText('👋 Choose framework!', frameworkButtons())
        await ctx.answerCbQuery()
    }
    @Action(['react', 'vuejs', 'angular'])
    async onAction2(@Ctx() ctx: Context) {
        console.log('inlineActionButtons:')
        await ctx.editMessageText('👋 Choose language!', langButtons())
        await ctx.answerCbQuery()
    }

    @Hears('3text2')
    os(@Ctx() ctx: Context) {
        console.log('[@Hears]: button 3text2')
        ctx.reply('[@Hears]: button 3text2')
    }

    @On('photo')
    onJoin(@Ctx() ctx: Context) {
        console.log('joined')
    }

    @On('text')
    onMessage(@Message('text') message: string, @Ctx() ctx: Context) {
        console.log(ctx.message.from)
        ctx.deleteMessage()
        switch (message) {
            case 'text1':
                return ctx.replyWithPhoto(
                    { url: "https://picsum.photos/200/300/?random" },
                    {
                        caption: "Caption",
                        parse_mode: "Markdown",
                        ...Markup.inlineKeyboard([
                            Markup.button.callback("Plain", "plain"),
                            Markup.button.callback("Italic", "italic"),
                        ]),
                    },
                );
                break
            case 'text2':
                console.log('sdsd')
                ctx.replyWithHTML(`<code>const foo = () => {}</code>`, actionButtons2())
                break
            case 'text3':
                ctx.reply('const foo = () => {}</code>', actionButtons3())
                break
        }
    }
}
