import { choiceListRoutesInstance, emptyRoutesInstance, startRaceInstance } from '../index.js'
import Route from '../models/route.js'
import User from '../models/user.js'
import SceneConstructor from './sceneConstructor.js'

export default class deleteRouteScene extends SceneConstructor {
    start() {
        this.scene.enter(ctx => {
            ctx.reply(`Удалить маршрут:\n"${ctx.session.routeName}" ?`, this.keyboard)
        })

        this.scene.hears(this.keyboard.reply_markup.keyboard[0][0], async ctx => {
            const candidate = await User.findOne({ _id: ctx.session.userId });
            const routes = await candidate.populate("routes")
            candidate.routes.splice(routes.routes.indexOf(routes.routes.find(route => route.name == ctx.session.routeName)), 1);
            await candidate.save();  
            await Route.deleteOne({ _id: ctx.session.routeId })
            ctx.session.isRoutes = (candidate.routes.length != 0) ? true : false 
            ctx.reply('Маршрут удален') 
            if (ctx.session.isRoutes) {
                ctx.scene.enter(choiceListRoutesInstance.name)
            } else {
                ctx.scene.enter(emptyRoutesInstance.name) 
            }
        })

        this.scene.hears(this.keyboard.reply_markup.keyboard[1][0], async ctx => {
            ctx.scene.enter(startRaceInstance.name)
        })
        return this.scene
    }
}