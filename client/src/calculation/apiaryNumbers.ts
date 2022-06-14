import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { Apiary } from '../models/apiary'
dayjs.locale('pl')
dayjs.extend(isSameOrBefore)

export const specialNumber = (data: Apiary[] | undefined) => {
  if (!data) return
  let isSameDay
  let specialNumber
  let latestItem

  if (data.length) {
    latestItem = data.reduce((a, b) => (a.createdAt > b.createdAt ? a : b))
    isSameDay = dayjs(Date.now()).isSameOrBefore(latestItem.createdAt, 'minutes')
    specialNumber = data.length ? latestItem.specialNumber + 1 : 1
  }

  let itemSpecialNumber = '00000' + (isSameDay ? specialNumber : 1)
  while (itemSpecialNumber.charAt(0) === '0' && itemSpecialNumber.length > 5) {
    itemSpecialNumber = itemSpecialNumber.substring(1)
  }
  
  return itemSpecialNumber
}

export const apiaryNumber = (data: Apiary[] | undefined) => {
  if (!data) return
    const dataObj = {
      date: dayjs(Date.now()).format('YYYYMMDD'),
      specialNumber: specialNumber(data),
    }

    const stringFromDataObj = Object.values(dataObj).join('')
    const numberFromDataObj = Number(stringFromDataObj)

    const arrayWithoutZeros = Array.from(stringFromDataObj)
      .map((str) => Number(str))
      .filter((num) => num !== 0)
    const sum = arrayWithoutZeros.reduce((a, b) => a * b, numberFromDataObj)
    const numberArray = Array.from(String(sum)).map((str) => Number(str))
    const result =
      stringFromDataObj +
      numberArray[1] +
      numberArray[6] +
      numberArray[numberArray.length - 1]
    return result
}