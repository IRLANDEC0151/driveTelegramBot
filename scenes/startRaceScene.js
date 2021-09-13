import { choiceListRoutesInstance, deleteRouteInstance, finishRaceInstance, startBotSceneInstance } from '../index.js'
import SceneConstructor from './sceneConstructor.js'

export default class startRaceScene extends SceneConstructor {
    start() {
        this.scene.enter(ctx => {
            ctx.reply(`Маршрут:\n"${ctx.session.routeName}"`,  this.keyboard)
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
        this.scene.hears(this.keyboard.reply_markup.keyboard[2][0], async ctx => { 
           ctx.scene.enter(deleteRouteInstance.name)
        })
        return this.scene
    } 
} 