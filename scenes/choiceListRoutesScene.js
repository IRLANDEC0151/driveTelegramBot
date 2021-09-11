import { startBotSceneInstance, startRaceInstance } from '../index.js'
import SceneConstructor from './sceneConstructor.js'

export default class choiceListRoutesScene extends SceneConstructor {
    start() {
        this.scene.enter(ctx => {
            ctx.reply('Выбор маршрута', this.keyboard)
        })

        this.scene.hears([this.keyboard.reply_markup.keyboard[0][0], this.keyboard.reply_markup.keyboard[1][0], this.keyboard.reply_markup.keyboard[2][0]], async ctx => {
            ctx.scene.enter(startRaceInstance.name)
           
        })  
         this.scene.hears(this.keyboard.reply_markup.keyboard[3][0], async ctx => {
             ctx.scene.enter(startBotSceneInstance.name)
           
        })
        return this.scene
    }
}
 