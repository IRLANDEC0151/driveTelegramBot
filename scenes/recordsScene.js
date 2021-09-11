import { startBotSceneInstance } from '../index.js'
import SceneConstructor from './sceneConstructor.js'

export default class recordsScene extends SceneConstructor {
    start() {
        this.scene.enter(ctx => {
            ctx.reply(`Текущий рекорд:\n\n 25 сек`, this.keyboard)
        })
        this.scene.hears(this.keyboard.reply_markup.keyboard[0][0], async ctx => {
            ctx.scene.enter(startBotSceneInstance.name)
       })
        return this.scene
    } 
} 