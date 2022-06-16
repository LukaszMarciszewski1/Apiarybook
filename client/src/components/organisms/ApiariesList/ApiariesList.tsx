import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import {
  useGetAllApiariesQuery,
  useUpdateApiaryMutation,
  useDeleteApiaryMutation,
} from "../../../store/api/apiaries";
import Popup from '../../molecules/Popup/Popup'
import Apiary from '../../molecules/Apiary/Apiary'
import Button from '../../atoms/Buttons/Button'
import TaskButton from '../../atoms/Buttons/TaskButton'
import { FiFilter } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Apiary as ApiaryModel } from '../../../models/apiary'

const ApiariesList = () => {
  const { data, error, isLoading } = useGetAllApiariesQuery()
  const [deleteApiary] = useDeleteApiaryMutation()
  const [isSortedOpen, setIsSortedOpen] = useState(false)
  const [lists, setLists] = useState<ApiaryModel[]>([] as ApiaryModel[])

  useEffect(() => {
    if (data) {
      setLists(data)
    }
  }, [data])

  const handleSortByDate = (props: string) => {
    if (!data) return
    const newList = [...lists]
    if (props === 'sort-from-oldest') newList.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
    if (props === 'sort-from-newest') newList.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    if (props === 'sort-fom-smallest-number') newList.sort((a, b) => (
      a.specialNumber > b.specialNumber ? 1
        : a.specialNumber < b.specialNumber ? -1 : 0))
    if (props === 'sort-fom-largest-number') newList.sort((a, b) => (
      a.specialNumber < b.specialNumber ? 1
        : a.specialNumber > b.specialNumber ? -1 : 0))

    setLists(newList)
  }

  return (
    <>
      <div className={styles.header}>
        <TaskButton name={'Filtruj'} onClick={() => setIsSortedOpen(true)} icon={<FiFilter />} bgColor={'grey'} color={'white'} />
      </div>
      <Popup title={'Filtrowanie'} closePopup={() => setIsSortedOpen(false)} trigger={isSortedOpen}>
        <TaskButton name={'Filtruj od najnowszych'} onClick={() => handleSortByDate('sort-from-newest')} width={'100%'} bgColor={'grey'} color={'white'} margin={'10px 0'} />
        <TaskButton name={'Filtruj od najstarszych'} onClick={() => handleSortByDate('sort-from-oldest')} width={'100%'} bgColor={'grey'} color={'white'} margin={'10px 0'} />
        <TaskButton name={'Filtruj od najmiejszego numeru'} onClick={() => handleSortByDate('sort-fom-smallest-number')} width={'100%'} bgColor={'grey'} color={'white'} margin={'10px 0'} />
        <TaskButton name={'Filtruj od największego numeru'} onClick={() => handleSortByDate('sort-fom-largest-number')} width={'100%'} bgColor={'grey'} color={'white'} />
      </Popup>
      <div className={styles.container}>
        {error && <h2>Connection error</h2>}
        {isLoading ? <div><h2>loading ...</h2></div> : (
          <table>
            <thead className={styles.tableHead}>
              <tr>
                <th>Nazwa pasieki</th>
                <th>Numer pasieki</th>
                <th>Data dodania</th>
                <th>Numer specjalny</th>
                <th>Usuń</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {
                lists?.map(apiary => (
                  <Apiary
                    key={apiary._id}
                    _id={apiary._id}
                    apiaryName={apiary.apiaryName}
                    apiaryNumber={apiary.apiaryNumber}
                    specialNumber={apiary.specialNumber}
                    createdAt={apiary.createdAt}
                    handleEdit={() => console.log('edit')}
                    editAction={
                      <>
                        <Button bgColor='grey' color='white' onClick={() => {
                          alert('Pasieka została usunięta?')
                          deleteApiary(apiary._id)
                        }} ><RiDeleteBin6Line /></Button>
                      </>
                    }
                  />
                ))
              }
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default ApiariesList