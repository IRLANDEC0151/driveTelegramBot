import { Markup } from "telegraf"

const keyboard = Markup.keyboard([
    ['Старт!'], ['Назад к списку', 'Главное меню']
]).resize(true)
export default keyboard