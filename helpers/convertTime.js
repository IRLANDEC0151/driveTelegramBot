export default function convertTime(time) {
   if (isNaN(time)) {
      return undefined
   } else {

      const convertTime = Math.floor(time / 3600000) + 'ч : ' + Math.floor(time / 60000) + 'мин : ' + Math.round(time % 60000 / 1000) + 'сек'
      return convertTime
   }
}