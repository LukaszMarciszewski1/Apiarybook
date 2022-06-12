import dayjs from 'dayjs';
dayjs.locale('pl')

export default function apiaryNumber(value: string){
  const dataObj = {
    date : dayjs(Date.now()).format('YYYYMMDD'),
    specialNumber : value, 
    //dodanie długości tablicy i uzupełnienie zeremi do 5 cyfrowego numeru + reset 00:01
    
  }
  
  const stringFromDataObj = Object.values(dataObj).join('')
  const numberFromDataObj = Number(stringFromDataObj)
  
  const arrayWithoutZeros = Array.from(stringFromDataObj).map(str => Number(str)).filter(num => num !== 0)
  const sum = arrayWithoutZeros.reduce((a, b)=> a * b, numberFromDataObj)
  const numberArray = Array.from(String(sum)).map(str => Number(str))
  const result = (stringFromDataObj + numberArray[1] + numberArray[6] + (numberArray[numberArray.length - 1]))
  console.log(result)
  return result
}


// const dataObjToArray = Object.values(dataObj)
// const stringValues = dataObjToArray.join('')
// const numberFromDataObj = Number(stringValues)
