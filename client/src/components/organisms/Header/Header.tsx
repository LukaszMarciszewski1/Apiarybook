import React, { useState } from 'react'
import styles from './styles.module.scss'
import IconButton from '../../atoms/Buttons/IconButton'
import { FiEdit } from 'react-icons/fi'
import TaskButton from '../../atoms/Buttons/Button'
import ApiaryCreator from '../ApiaryCreator/ApiaryCreator'
import Modal from '../../molecules/Modal/Modal'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import {
  useGetAllApiariesQuery,
  useCreateApiaryMutation
} from "../../../store/api/apiaries";

import {Apiary as ApiaryModel} from '../../../models/apiary'

const Header = () => {
  const { data, error, isLoading } = useGetAllApiariesQuery()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createApiary] = useCreateApiaryMutation()
  const handleOpenCreator = () => {

  }

  const handleCreateApiary = (data: ApiaryModel) => {
    createApiary({
      apiaryName: data.apiaryName,
      apiaryNumber: data.apiaryNumber
    })
    setIsModalOpen(false)
  }

  return (
    <div className={styles.header}>
      <TaskButton name={'Dodaj nową pasiekę'} onClick={() => setIsModalOpen(true)} icon={<FiEdit />} bgColor={'green'} color={'white'} />
      <Modal title={'Dodawanie pasieki do rejestru'} closeModal={() => setIsModalOpen(false)} trigger={isModalOpen}>
        <ApiaryCreator apiaryName='' apiaryNumber={10000} handleCreateApiary={handleCreateApiary}/>
      </Modal>
    </div>
  )
}

export default Header