import React, { useState } from 'react'
import dayjs from 'dayjs'
import styles from './styles.module.scss'
import { FiEdit } from 'react-icons/fi'
import TaskButton from '../../atoms/Buttons/Button'
import ApiaryCreator from '../ApiaryCreator/ApiaryCreator'
import Modal from '../../molecules/Modal/Modal'
import {
  useGetAllApiariesQuery,
  useCreateApiaryMutation
} from "../../../store/api/apiaries";

import {Apiary as ApiaryModel} from '../../../models/apiary'
import {apiaryNumber, specialNumber} from '../../../calculation/apiaryNumbers'

const Header = () => {
  dayjs.locale('pl');
  const { data, error, isLoading } = useGetAllApiariesQuery()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createApiary] = useCreateApiaryMutation()
  const newApiaryNumber = apiaryNumber(data)
  const newSpecialNumber = specialNumber(data)


  const handleOpenCreator = () => {

  }

  const handleCreateApiary = (data: ApiaryModel) => {
    createApiary({
      apiaryName: data.apiaryName,
      apiaryNumber: Number(newApiaryNumber),
      specialNumber: Number(newSpecialNumber),
    })
    setIsModalOpen(false)
  }

  return (
    <div className={styles.header}>
      <TaskButton name={'Dodaj nową pasiekę'} onClick={() => setIsModalOpen(true)} icon={<FiEdit />} bgColor={'green'} color={'white'} />
      <Modal title={'Dodawanie pasieki do rejestru'} closeModal={() => setIsModalOpen(false)} trigger={isModalOpen}>
        <ApiaryCreator apiaryName='' apiaryNumber={Number(newApiaryNumber)} handleCreateApiary={handleCreateApiary}/>
      </Modal>
    </div>
  )
}

export default Header