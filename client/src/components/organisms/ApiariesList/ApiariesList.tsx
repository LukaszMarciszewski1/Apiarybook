import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import Apiary from '../../molecules/Apiary/Apiary'


import Button from '../../atoms/Buttons/Button'
import { Apiary as ApiaryModel } from '../../../models/apiary'
import {
  useGetAllApiariesQuery,
  useUpdateApiaryMutation,
  useDeleteApiaryMutation,
} from "../../../store/api/apiaries";
import Modal from '../../molecules/Modal/Modal'
import { RiDeleteBin6Line } from 'react-icons/ri'
import TaskButton from '../../atoms/Buttons/TaskButton'
import ApiaryCreator from '../ApiaryForm/ApiaryForm'

import Popup from '../../molecules/Popup/Popup'
import { FiFilter } from 'react-icons/fi'

const ApiariesList = () => {
  const { data, error, isLoading } = useGetAllApiariesQuery()
  const [updateApiary] = useUpdateApiaryMutation()
  const [deleteApiary] = useDeleteApiaryMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentApiary, setCurrentApiary] = useState<ApiaryModel>({} as ApiaryModel)
  const [isSortedOpen, setIsSortedOpen] = useState(false)
  const [lists, setLists] = useState<ApiaryModel[]>([] as ApiaryModel[])

  useEffect(() => {
    if (data) {
      setLists(data)
    }
  }, [data])

  const handleUpdateApiary = (data: ApiaryModel) => {
    updateApiary({
      _id: currentApiary._id,
      apiaryName: data.apiaryName,
      apiaryNumber: data.apiaryNumber
    })
    setIsModalOpen(false)
  }

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
                        {/* <Button bgColor='green' color='white' margin='0 10px 0 0' onClick={() => {
                        setIsModalOpen(true)
                        setCurrentApiary(apiary)
                      }} ><FiEdit />
                      </Button> */}
                        <Button bgColor='grey' color='white' onClick={() => {
                          // alert('Pasieka została usunięta?')
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
        <Modal title={'Edytowanie pasieki'} closeModal={() => setIsModalOpen(false)} trigger={isModalOpen}>
          {/* <ApiaryCreator 
          apiaryName={currentApiary.apiaryName} 
          apiaryNumber={currentApiary.apiaryNumber} 
          handleCreateApiary={handleUpdateApiary} 
        /> */}
        </Modal>
      </div>
    </>
  )
}

export default ApiariesList