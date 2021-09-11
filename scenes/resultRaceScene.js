import { recordsSceneInstance, startBotSceneInstance } from '../index.js'
import SceneConstructor from './sceneConstructor.js'

export default class resultRaceScene extends SceneConstructor {
    start() {
        this.scene.enter(ctx => {
            ctx.reply(`Время: ${ctx.session.raceTime}`, this.keyboard)
        })
        this.scene.hears(this.keyboard.reply_markup.keyboard[0][0], async ctx => {
            ctx.scene.enter(startBotSceneInstance.name)
       })  
       this.scene.hears(this.keyboard.reply_markup.keyboard[0][1], async ctx => {
        ctx.scene.enter(recordsSceneInstance.name)
       })
        return this.scene
    } 
} 