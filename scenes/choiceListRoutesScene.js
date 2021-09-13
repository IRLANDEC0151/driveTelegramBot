import { createRouteInstance, startBotSceneInstance, startRaceInstance } from '../index.js'
import SceneConstructor from './sceneConstructor.js'
import Route from '../models/route.js'
import getRoutes from '../helpers/getRoutes.js'
import User from '../models/user.js'
import { Markup } from 'telegraf'
export default class choiceListRoutesScene extends SceneConstructor {
    start() {
        try {
            this.scene.enter(async ctx => {
                let arr = await getRoutes(ctx.session.userId) 
                ctx.reply('Выберите маршрут', Markup.keyboard(
                    [...arr,
                    [this.keyboard.reply_markup.keyboard[this.keyboard.reply_markup.keyboard.length - 1][0],
                    this.keyboard.reply_markup.keyboard[this.keyboard.reply_markup.keyboard.length - 1][1] 
                ]]
                ).resize(true))
            })
            this.scene.hears(this.keyboard.reply_markup.keyboard[this.keyboard.reply_markup.keyboard.length - 1][1], async ctx => {
                ctx.scene.enter(startBotSceneInstance.name)

            })
            this.scene.hears(this.keyboard.reply_markup.keyboard[this.keyboard.reply_markup.keyboard.length - 1][0], async ctx => {
                ctx.scene.enter(createRouteInstance.name)   

            })
            this.scene.hears(/^(?!.*\/start).+$/, async ctx => {
                let {id,name} = (await Route.findOne({ name: ctx.message.text }))
                ctx.session.routeId = id
                ctx.session.routeName = name
                ctx.scene.enter(startRaceInstance.name)
            })
            return this.scene
        } catch (error) {
            console.log(error);
        }

    }

}
