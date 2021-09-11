import { finishRaceInstance, resultRaceInstance, startRaceInstance } from '../index.js'
import SceneConstructor from './sceneConstructor.js'

export default class finishRaceScene extends SceneConstructor {
    start() {
        let interval, dateStart, dateEnd
        this.scene.enter(ctx => {
            let count = 3
            interval = setInterval(async () => {
                if (count != 0) {
                    ctx.reply(count)
                } else {
                    await ctx.reply('Поехали!', this.keyboard)
                    clearInterval(interval)
                     dateStart = new Date()
                 
                }
                count--
            }, 1000)
        })

        this.scene.hears(this.keyboard.reply_markup.keyboard[0][0], ctx => {
            dateEnd = new Date()
            let raceTime = Math.floor((dateEnd - dateStart) / 3600000) + 'ч : ' + Math.floor((dateEnd - dateStart) / 60000) + 'мин : ' + Math.round((dateEnd - dateStart) % 60000 / 1000) + 'сек'
            ctx.session.raceTime = raceTime
            ctx.scene.enter(resultRaceInstance.name)

        })

        this.scene.hears(this.keyboard.reply_markup.keyboard[0][1], ctx => {
            clearInterval(interval)
            ctx.scene.enter(finishRaceInstance.name)

        })
        this.scene.hears(this.keyboard.reply_markup.keyboard[1][0], ctx => {
            clearInterval(interval)
            ctx.scene.enter(startRaceInstance.name)
        })
        return this.scene
    }

}