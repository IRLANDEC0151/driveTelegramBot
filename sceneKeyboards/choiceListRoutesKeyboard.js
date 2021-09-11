import { Markup } from "telegraf"

const keyboard = Markup.keyboard([
    ['От дома до в/ч'], ['От вокзала до в/ч'], ['От в/ч до дома'], ['Назад']
]).resize(true) 

export default keyboard