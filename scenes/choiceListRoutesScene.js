import { startBotSceneInstance, startRaceInstance } from '../index.js'
import SceneConstructor from './sceneConstructor.js'
import Route from '../models/route.js'
import getRoutes from '../helpers/getRoutes.js'
import User from '../models/user.js'
import { Markup } from 'telegraf'
export default class choiceListRoutesScene extends SceneConstructor {
    start() {
        try {
            this.scene.enter(async ctx => {
               // await createRoute(ctx.session.userId)
                let arr = await getRoutes(ctx.session.userId)
                ctx.reply('Выберите маршрут из вашего списка', Markup.keyboard(
                    [...arr, [this.keyboard.reply_markup.keyboard[this.keyboard.reply_markup.keyboard.length - 1][0]]]
                ).resize(true)) 
            }) 
            this.scene.hears(this.keyboard.reply_markup.keyboard[this.keyboard.reply_markup.keyboard.length - 1][0], async ctx => {
                ctx.scene.enter(startBotSceneInstance.name)

            })
            this.scene.hears(/^(?!.*\/start).+$/, async ctx => {
                let routeId = (await Route.findOne({ name: ctx.message.text })).id
                ctx.session.routeId = routeId
                ctx.scene.enter(startRaceInstance.name)
            })
            return this.scene
        } catch (error) { 
            console.log(error);
        }

    }

}
