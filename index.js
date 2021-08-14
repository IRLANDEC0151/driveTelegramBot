const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()

const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
    console.log(ctx.message)
    return ctx.reply(`Hello ${ctx.message.from.username}`)
})
bot.help((ctx) => ctx.reply(text.command))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Курсы</b>', Markup.inlineKeyboard(
            [
                [
                    Markup.button.callback('Редакторы', 'btn_1'),
                    Markup.button.callback('Отзывы', 'btn_2'),
                    Markup.button.callback('Обзор', 'btn_3')
                ],
                [Markup.button.callback('Сохранить', 'btn_4'),]

            ]
        ))
    } catch (error) {
        console.log(error); 
    }

})

function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if (src) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        } catch (error) {
            console.log(error);
        }
    })

}


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))