import { startBotSceneInstance } from '../index.js'
import SceneConstructor from './sceneConstructor.js'
import User from '../models/user.js';
import convertTime from '../helpers/convertTime.js';

export default class recordsScene extends SceneConstructor {
    start() {
        this.scene.enter(async ctx => {
            const candidate = await User.findById(ctx.session.userId);
            const arr = await candidate.populate("routes")
            const records = arr.routes.map(route => {
                return { name: route.name, time: convertTime(route.timeRecord) || 'Нет времени' }
            })
            const recordsString = createRecordsString(records)
            ctx.reply(recordsString, this.keyboard)
        })
        this.scene.hears(this.keyboard.reply_markup.keyboard[0][0], async ctx => {
            ctx.scene.enter(startBotSceneInstance.name)
        })
        return this.scene
    }
}
function createRecordsString(records) {
    let string = ``
    for (let index = 0; index < records.length; index++) {
        const element = records[index];
        string = string.concat(`${element.name}\n${element.time}\n\n`)
    }
    return string

} 