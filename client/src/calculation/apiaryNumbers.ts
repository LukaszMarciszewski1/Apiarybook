import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { Apiary } from '../models/apiary'
dayjs.locale('pl')

dayjs.extend(isToday)
export const specialNumber = (data: Apiary[] | undefined) => {
  if (data) {
    const itemsSpecialNumber = data?.map((item) => item.specialNumber)
    const largestNumberOfItems = itemsSpecialNumber.length
      ? itemsSpecialNumber?.reduce((a, b) => Math.max(a, b + 1))
      : 1
    const isToday = dayjs().isToday()
    let initialSpNumber = '00000' + (isToday ? largestNumberOfItems : 1)
    while (initialSpNumber.charAt(0) === '0' && initialSpNumber.length > 5) {
      initialSpNumber = initialSpNumber.substring(1)
    }
    return initialSpNumber
  }
}

export const apiaryNumber = (data: Apiary[] | undefined) => {
  if (data) {
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
}
