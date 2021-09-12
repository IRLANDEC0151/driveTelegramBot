import { choiceListRoutesInstance, recordsSceneInstance,emptyRoutesInstance } from '../index.js'
import User from '../models/user.js'
import SceneConstructor from './sceneConstructor.js'
 
export default class startBotScene extends SceneConstructor {
    start() {
        try {
            this.scene.enter(ctx => {
                ctx.reply('Главное меню', this.keyboard)
            })

            this.scene.hears(this.keyboard.reply_markup.keyboard[0][0], async ctx => {
            
                if (ctx.session.isRoutes) {
                    ctx.scene.enter(choiceListRoutesInstance.name)
                } else {
                      ctx.scene.enter(emptyRoutesInstance.name)
                }   
            }) 
            this.scene.hears(this.keyboard.reply_markup.keyboard[0][1], async ctx => {
                ctx.scene.enter(recordsSceneInstance.name)
            })
            return this.scene
        } catch (error) {
            console.log(error);
        }

    }
}