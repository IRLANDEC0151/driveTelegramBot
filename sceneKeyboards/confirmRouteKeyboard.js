import { Markup } from "telegraf"
// ['От дома до в/ч'], ['От вокзала до в/ч'], ['От в/ч до дома'], ['Назад']

  
export default Markup.keyboard([
   ['Подтвердить'], ['Изменить'] 
]).resize(true) 