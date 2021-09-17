import { confirmRouteInstance, createRouteInstance, emptyRoutesInstance, startBotSceneInstance } from '../index.js'
import SceneConstructor from './sceneConstructor.js'

export default class createRouteScene extends SceneConstructor {
    start() {
        this.scene.enter(ctx => {
            ctx.reply('Введите название маршрута в формате:\n "От   <пункт А>  до   <пункт B> "\n Например:\n "От дома до работы" ', this.keyboard)
        })

        this.scene.hears(this.keyboard.reply_markup.keyboard[0][0], async ctx => {
            ctx.scene.enter(emptyRoutesInstance.name)
        }) 
         
        this.scene.hears(/^(?!.*\/start).+$/, async ctx => {
            if (ctx.message.text != this.keyboard.reply_markup.keyboard[0][0]) {
                ctx.session.newRoute=ctx.message.text 
                ctx.scene.enter(confirmRouteInstance.name)
            }else{
                ctx.scene.reenter(createRouteInstance.name)
                
            }
        })

        return this.scene
    }
}