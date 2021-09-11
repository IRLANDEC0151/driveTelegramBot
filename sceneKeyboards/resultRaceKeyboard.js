import { Markup } from 'telegraf'

const keyboard = Markup.keyboard([
    ['Главное меню', 'Таблица рекордов']
]).resize(true)
export default keyboard