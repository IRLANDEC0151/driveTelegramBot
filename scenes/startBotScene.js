import {choiceListRoutesInstance, recordsSceneInstance} from '../index.js'
import SceneConstructor from './sceneConstructor.js'

export default class startBotScene extends SceneConstructor {
    start() {
        this.scene.enter(ctx => {
            ctx.reply('Привет', this.keyboard)
        })
          
        this.scene.hears(this.keyboard.reply_markup.keyboard[0][0], async ctx => { 
            ctx.scene.enter(choiceListRoutesInstance.name)
        })   
        this.scene.hears(this.keyboard.reply_markup.keyboard[0][1], async ctx => { 
            ctx.scene.enter(recordsSceneInstance.name)
        })
        return this.scene
    } 
}  