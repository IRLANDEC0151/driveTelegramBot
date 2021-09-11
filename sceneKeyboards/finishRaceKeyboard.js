import { Markup } from "telegraf"

const keyboard = Markup.keyboard([
    ['Финиш!', 'Начать заново'], ['Назад']
]).resize(true)
export default keyboard