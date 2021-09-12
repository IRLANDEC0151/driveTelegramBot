import telegraf from 'telegraf';
const { Telegraf, Markup, Scenes: { BaseScene, Stage } } = telegraf;
import d from 'dotenv'
d.config()
import { MongoClient } from 'mongodb'
import mongoose from 'mongoose';
import { session } from 'telegraf-session-mongodb';
import User from './models/user.js';


//scenes
import choiceListRoutesScene from './scenes/choiceListRoutesScene.js';
import startBotScene from './scenes/startBotScene.js';
import recordsScene from './scenes/recordsScene.js';
import startRaceScene from './scenes/startRaceScene.js';
import finishRaceScene from './scenes/finishRaceScene.js';
import resultRaceScene from './scenes/resultRaceScene.js';
import emptyRoutesScene from './scenes/emptyRoutesScene.js';
import createRouteScene from './scenes/createRouteScene.js';
import confirmRouteScene from './scenes/confirmRouteScene.js';
//keyboards
import choiceListRoutesKeyboard from './sceneKeyboards/choiceListRoutesKeyboard.js'
import startBotKeyboard from './sceneKeyboards/startBotKeyboard.js'
import recordsKeyboard from './sceneKeyboards/recordsKeyboard.js'
import startRaceKeyboard from './sceneKeyboards/startRaceKeyboard.js'
import finishRaceKeyboard from './sceneKeyboards/finishRaceKeyboard.js'
import resultRaceKeyboard from './sceneKeyboards/resultRaceKeyboard.js'
import emptyRoutesKeyboard from './sceneKeyboards/emptyRoutesKeyboard.js'
import createRouteKeyboard from './sceneKeyboards/createRouteKeyboard.js'
import confirmRouteKeyboard from './sceneKeyboards/confirmRouteKeyboard.js'
   
//instances
export const choiceListRoutesInstance = new choiceListRoutesScene(BaseScene, 'choiceListRoutes', choiceListRoutesKeyboard)
export const startBotSceneInstance = new startBotScene(BaseScene, 'startBotScene', startBotKeyboard)
export const recordsSceneInstance = new recordsScene(BaseScene, 'recordsScene', recordsKeyboard)
export const startRaceInstance = new startRaceScene(BaseScene, 'startRaceScene', startRaceKeyboard)
export const finishRaceInstance = new finishRaceScene(BaseScene, 'finishRaceScene', finishRaceKeyboard)
export const resultRaceInstance = new resultRaceScene(BaseScene, 'resultRaceScene', resultRaceKeyboard)
export const emptyRoutesInstance = new emptyRoutesScene(BaseScene, 'emptyRoutesScene', emptyRoutesKeyboard)
export const createRouteInstance = new createRouteScene(BaseScene, 'createRouteScene', createRouteKeyboard)
export const confirmRouteInstance = new confirmRouteScene(BaseScene, 'confirmRouteScene', confirmRouteKeyboard)

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Stage([
    choiceListRoutesInstance.start(),
    startBotSceneInstance.start(),
    recordsSceneInstance.start(),
    startRaceInstance.start(),
    finishRaceInstance.start(),
    resultRaceInstance.start(),
    emptyRoutesInstance.start(),
    createRouteInstance.start(),
    confirmRouteInstance.start()
])


 
async function startBot() {
    console.log('start');
    const client = (await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })).db()
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('DB connected');
    bot.use(session(client, { collectionName: 'sessions' }));
    bot.use(stage.middleware())
    bot.start(async ctx => {
        let candidate = await User.findOne({ telegramId: ctx.update.message.from.id })
        if (candidate) {
            console.log('Такой пользователь уже есть');
        } else {
            console.log('новый пользователь');
            const user = new User({
                telegramId: ctx.update.message.from.id,
                name: ctx.update.message.from.first_name,
                routes: []
            })
            candidate = user
            await user.save()
        }
        ctx.session.userId = candidate.id 
        ctx.session.isRoutes = (candidate.routes.length != 0) ? true : false
        ctx.scene.enter(startBotSceneInstance.name)
    })

    console.log('bot launched');

}

startBot()
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
