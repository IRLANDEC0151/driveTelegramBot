import Route from '../models/route.js'

export default  function convertTime(time) {
   const convertTime=Math.floor(time / 3600000) + 'ч : ' + Math.floor(time / 60000) + 'мин : ' + Math.round(time % 60000 / 1000) + 'сек'
   return convertTime
} 