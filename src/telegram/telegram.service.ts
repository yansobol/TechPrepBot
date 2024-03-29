import { Action, Ctx, Hears, Message, On, Start, Update } from "nestjs-telegraf";
import { Markup, Scenes, Telegraf } from "telegraf";
import { actionButtons, actionButtons2, actionButtons3 } from "./buttons";
import { ConfigService } from "@nestjs/config";
import { ChatgptService } from "@src/chatgpt/chatgpt.service";

type Context = Scenes.SceneContext

@Update()
export class TelegramService extends Telegraf<Context> {
    constructor(private readonly config: ConfigService, private readonly chatGpt: ChatgptService) {
        super(config.get('TELEGRAM_TOKEN'));
    }

    @Start()
    async onStart(@Ctx() ctx: Context) {
        await ctx.reply('👋 Hello!', actionButtons())
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
        console.log(ctx)
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
