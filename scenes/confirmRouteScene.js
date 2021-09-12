import createRoute from '../helpers/createRoute.js'
import { choiceListRoutesInstance, createRouteInstance, startBotSceneInstance } from '../index.js'
import SceneConstructor from './sceneConstructor.js'

export default class confirmRouteScene extends SceneConstructor {
    start() {
        this.scene.enter(ctx => {
            ctx.reply(`Новый маршрут:\n"${ctx.session.newRoute}"`, this.keyboard)
        })

        this.scene.hears(this.keyboard.reply_markup.keyboard[0][0], async ctx => {
            await createRoute(ctx.session.userId, ctx.session.newRoute)
            ctx.session.isRoutes=true
            ctx.scene.enter(choiceListRoutesInstance.name)
        })
        this.scene.hears(this.keyboard.reply_markup.keyboard[1][0], async ctx => {
            ctx.scene.enter(createRouteInstance.name)
        })
        return this.scene
    }
}