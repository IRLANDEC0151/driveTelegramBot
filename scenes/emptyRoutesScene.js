import { startBotSceneInstance, createRouteInstance } from '../index.js'
import SceneConstructor from './sceneConstructor.js'

export default class emptyRoutesScene extends SceneConstructor {
    start() {
        try {
            this.scene.enter(ctx => {
                console.log(this.keyboard.reply_markup.keyboard[1][0]);
                ctx.reply('Вы еще не создали маршрут', this.keyboard)
            })
            this.scene.hears(this.keyboard.reply_markup.keyboard[0][0], async ctx => {
                ctx.scene.enter(createRouteInstance.name)
            })
            this.scene.hears(this.keyboard.reply_markup.keyboard[1][0], async ctx => {
                ctx.scene.enter(startBotSceneInstance.name)
            })
            return this.scene
        } catch (error) {
            console.log(error);
        }

    }
}