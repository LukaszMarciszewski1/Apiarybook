import React, { useState } from 'react'
import styles from './styles.module.scss'
import Apiary from '../../molecules/Apiary/Apiary'
import { FiEdit } from 'react-icons/fi'
import IconButton from '../../atoms/Buttons/IconButton'
import { Apiary as ApiaryModel } from '../../../models/apiary'

import {
  useGetAllApiariesQuery,
  useGetApiaryQuery,
  useCreateApiaryMutation,
  useUpdateApiaryMutation,
  useDeleteApiaryMutation,
} from "../../../store/api/apiaries";
import Modal from '../../molecules/Modal/Modal'
import ApiaryCreator from '../ApiaryCreator/ApiaryCreator'

const ApiariesList = () => {
  const { data, error, isLoading } = useGetAllApiariesQuery()
  const [updateApiary] = useUpdateApiaryMutation()
  const [deleteApiary] = useDeleteApiaryMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentApiary, setCurrentApiary] = useState<ApiaryModel>({} as ApiaryModel)

  const handleUpdateApiary = (data: ApiaryModel) => {
    updateApiary({
      _id: currentApiary._id,
      apiaryName: data.apiaryName,
      apiaryNumber: data.apiaryNumber
    })
    setIsModalOpen(false)
  }

  const handleRemoveApiary = () => {

  }

  return (
    <div className={styles.container}>
      {error && <h2>Connection error</h2>}
      {isLoading ? <div><h2>loading ...</h2></div> : (
        <table>
          <thead className={styles.tableHead}>
            <tr>
              <th>Nazwa pasieki</th>
              <th>Numer pasieki</th>
              <th>Data dodania</th>
              <th>Data edycji</th>
              <th>numer specjalny</th>
              <th>edycja</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {
              data?.map(apiary => (
                <Apiary
                  key={apiary._id}
                  _id={apiary._id}
                  apiaryName={apiary.apiaryName}
                  apiaryNumber={apiary.apiaryNumber}
                  specialNumber={apiary.specialNumber}
                  updatedAt={apiary.updatedAt}
                  createdAt={apiary.createdAt}
                  handleEdit={() => console.log('edit')}
                  editAction={
                    <>
                      <IconButton bgColor='green' color='white' margin='0 10px 0 0' onClick={() => {
                        setIsModalOpen(true)
                        setCurrentApiary(apiary)
                      }} ><FiEdit />
                      </IconButton>
                      <IconButton bgColor='red' color='white' onClick={() => {
                        alert('Czy chcesz usunąć pasięk?')
                        deleteApiary(apiary._id)
                      }} ><FiEdit /></IconButton>
                    </>
                  }
                />
              ))
            }
          </tbody>
        </table>
      )}
      <Modal title={'Edytowanie pasieki'} closeModal={() => setIsModalOpen(false)} trigger={isModalOpen}>
        <ApiaryCreator 
          apiaryName={currentApiary.apiaryName} 
          apiaryNumber={currentApiary.apiaryNumber} 
          handleCreateApiary={handleUpdateApiary} 
        />
      </Modal>
    </div>
  )
}

export default ApiariesList