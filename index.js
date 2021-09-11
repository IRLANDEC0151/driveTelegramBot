import telegraf from 'telegraf';
const { Telegraf, Markup, Scenes: { BaseScene, Stage }, session } = telegraf;
import d from 'dotenv'
d.config()

//scenes
import choiceListRoutesScene from './scenes/choiceListRoutesScene.js';
import startBotScene from './scenes/startBotScene.js';
import recordsScene from './scenes/recordsScene.js';
import startRaceScene from './scenes/startRaceScene.js';
import finishRaceScene from './scenes/finishRaceScene.js';
import resultRaceScene from './scenes/resultRaceScene.js';
//keyboards
import choiceListRoutesKeyboard from './sceneKeyboards/choiceListRoutesKeyboard.js'
import startBotKeyboard from './sceneKeyboards/startBotKeyboard.js'
import recordsKeyboard from './sceneKeyboards/recordsKeyboard.js'
import startRaceKeyboard from './sceneKeyboards/startRaceKeyboard.js'
import finishRaceKeyboard from './sceneKeyboards/finishRaceKeyboard.js'
import resultRaceKeyboard from './sceneKeyboards/resultRaceKeyboard.js'

//instances
export const choiceListRoutesInstance = new choiceListRoutesScene(BaseScene, 'choiceListRoutes', choiceListRoutesKeyboard)
export const startBotSceneInstance = new startBotScene(BaseScene, 'startBotScene', startBotKeyboard)
export const recordsSceneInstance = new recordsScene(BaseScene, 'recordsScene', recordsKeyboard)
export const startRaceInstance = new startRaceScene(BaseScene, 'startRaceScene', startRaceKeyboard)
export const finishRaceInstance = new finishRaceScene(BaseScene, 'finishRaceScene', finishRaceKeyboard)
export const resultRaceInstance = new resultRaceScene(BaseScene, 'resultRaceScene', resultRaceKeyboard)

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Stage([
    choiceListRoutesInstance.start(),
    startBotSceneInstance.start(),
    recordsSceneInstance.start(),
    startRaceInstance.start(),
    finishRaceInstance.start(),
    resultRaceInstance.start()
])
bot.use(session())
bot.use(stage.middleware())

bot.start(ctx => {
    ctx.scene.enter(startBotSceneInstance.name)
})
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
