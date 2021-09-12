import convertTime from '../helpers/convertTime.js'
import { recordsSceneInstance, startBotSceneInstance } from '../index.js'
import Route from '../models/route.js'
import SceneConstructor from './sceneConstructor.js'

export default class resultRaceScene extends SceneConstructor {
    start() {
        this.scene.enter(async ctx => {
            let result = await timing(ctx.session)
            if (result.isRecord == undefined) {
                ctx.reply(`Первое время маршрута: ${ctx.session.raceTime}`, this.keyboard)
            } else if (result.isRecord) {
                ctx.reply(`Время: ${ctx.session.raceTime}.\nПоздравляем, новый рекорд!\nБыстрее на ${result.fasterBy}`, this.keyboard)
            } else {
                ctx.reply(`Время: ${ctx.session.raceTime}.\n
                До рекорда не хватило ${result.slowerBy}`, this.keyboard)
            }
        })
        this.scene.hears(this.keyboard.reply_markup.keyboard[0][0], async ctx => {
            ctx.scene.enter(startBotSceneInstance.name)
        })
        this.scene.hears(this.keyboard.reply_markup.keyboard[0][1], async ctx => {
            ctx.scene.enter(recordsSceneInstance.name)
        })
        return this.scene
    }
}
async function timing({ raceTimeForCompare, routeId }) {
    const route = await Route.findById(routeId)
    if (!route.timeRecord) {
        route.timeRecord = raceTimeForCompare
        await route.save()
        return { isRecord: undefined }
    } else if (raceTimeForCompare < route.timeRecord) {
        let fasterBy = route.timeRecord - raceTimeForCompare
        route.timeRecord = raceTimeForCompare
        await route.save()
        return { isRecord: true, fasterBy: convertTime(fasterBy) }
    } else {
        return { isRecord: false, slowerBy: convertTime(raceTimeForCompare - route.timeRecord) }
    }
}