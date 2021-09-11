import { choiceListRoutesInstance, finishRaceInstance, startBotSceneInstance } from '../index.js'
import SceneConstructor from './sceneConstructor.js'

export default class startRaceScene extends SceneConstructor {
    start() {
        this.scene.enter(ctx => {
            ctx.reply('старт', this.keyboard)
        })
        this.scene.hears(this.keyboard.reply_markup.keyboard[0][0], async ctx => { 
            ctx.scene.enter(finishRaceInstance.name)
        }) 
          this.scene.hears(this.keyboard.reply_markup.keyboard[1][0], async ctx => { 
            ctx.scene.enter(choiceListRoutesInstance.name)
        }) 
        this.scene.hears(this.keyboard.reply_markup.keyboard[1][1], async ctx => { 
            ctx.scene.enter(startBotSceneInstance.name)
        })
        return this.scene
    } 
} 