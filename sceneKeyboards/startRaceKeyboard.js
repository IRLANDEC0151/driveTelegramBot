import { Markup } from "telegraf"

const keyboard = Markup.keyboard([
    ['Старт!'], ['Назад к списку','Главное меню'], ['Удалить маршрут']  
]).resize(true)
export default keyboard 