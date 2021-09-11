import telegraf from 'telegraf'
const { Scenes: { BaseScene } } = telegraf


export default class SceneConstructor {
    constructor(scene, name, keyboard) {
        if (scene == BaseScene) {
            this.scene = new BaseScene(name)
        }
        this.keyboard = keyboard
        this.name=name
    }
}