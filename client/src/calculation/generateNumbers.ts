import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { Apiary } from '../models/apiary'
dayjs.locale('pl')
dayjs.extend(isSameOrAfter)

type SpecialNumberValues = {
  isSameDay: boolean
  specialNumber: number
  specialNumberToStr: string
}
export const getSpecialNumber = (data: Apiary[] | undefined) => {
  if (!data) return
  const dataTypes = {} as SpecialNumberValues
  let { specialNumber, isSameDay, specialNumberToStr } = dataTypes
  const dataWithoutEditSpecialNumber = data?.filter(
    (item) => item.editSpecialNumber === false
  )
  let newSpecialNumber
  if (data.length > 0) {
    const latestItemOfData = dataWithoutEditSpecialNumber.reduce((a, b) =>
      a.createdAt > b.createdAt ? a : b
    )
    const biggestItemOfData = data
      .map((i) => i.specialNumber)
      .reduce((a, b) => (a > b ? a : b))
    isSameDay = dayjs(latestItemOfData.createdAt).isSameOrAfter(
      new Date(),
      'day'
    )
    specialNumber = data.length ? latestItemOfData.specialNumber + 1 : 1
    if (specialNumber === biggestItemOfData) {
      specialNumber = biggestItemOfData + 1
    }
    //used algorithm from Stack Overflow -----------------------------------------------------------------------------------------------------------------------------------------//
    let missingNumbers = (a: number[], l = true) =>
      Array.from(Array(Math.max(...a)).keys())
        .map((n, i) =>
          a.indexOf(i) < 0 && (!l || i > Math.min(...a)) ? i : null
        )
        .filter((f) => f)
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    const missingArray = data.map((item) => item.specialNumber)
    newSpecialNumber = missingNumbers(missingArray).length
      ? missingNumbers(missingArray)[0]
      : specialNumber
  }
  specialNumberToStr = '00000' + (isSameDay ? newSpecialNumber : 1)
  while (
    specialNumberToStr.charAt(0) === '0' &&
    specialNumberToStr.length > 5
  ) {
    specialNumberToStr = specialNumberToStr.substring(1)
  }
  return specialNumberToStr
}

export const getApiaryNumber = (specialNumber: string | undefined) => {
  if (!specialNumber) return
  const dataObj = {
    date: <string>dayjs(Date.now()).format('YYYYMMDD'),
    specialNumber: <string>specialNumber,
  }
  const stringFromDataObj: string = Object.values(dataObj).join('')
  const numberFromDataObj: number = Number(stringFromDataObj)
  const arrayWithoutZeros: number[] = Array.from(stringFromDataObj)
    .map((str) => Number(str))
    .filter((num) => num !== 0)
  const sum = arrayWithoutZeros.reduce((a, b) => a * b, numberFromDataObj)
  const numberArray = Array.from(String(sum)).map((str) => Number(str))
  const apiaryNumber =
    stringFromDataObj +
    numberArray[1] +
    numberArray[6] +
    numberArray[numberArray.length - 1]
  return apiaryNumber
}
