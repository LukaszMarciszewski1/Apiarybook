import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import styles from './styles.module.scss'
import { FiEdit } from 'react-icons/fi'
import TaskButton from '../../atoms/Buttons/TaskButton'
import ApiaryForm from '../ApiaryForm/ApiaryForm'
import Modal from '../../molecules/Modal/Modal'
import Popup from '../../molecules/Popup/Popup'
import {
  useGetAllApiariesQuery,
  useCreateApiaryMutation
} from "../../../store/api/apiaries";

import { Apiary as ApiaryModel } from '../../../models/apiary'
import { getApiaryNumber, getSpecialNumber } from '../../../calculation/generateNumbers'

const Header = () => {
  dayjs.locale('pl');
  const { data } = useGetAllApiariesQuery()
  const [createApiary] = useCreateApiaryMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editSpecialNumber, setEditSpecialNumber] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [specialNumber, setSpecialNumber] = useState<string | undefined>('')
  const [apiaryNumber, setApiaryNumber] = useState<string | undefined>('')
  const newSpecialNumber = getSpecialNumber(data)
  const newApiaryNumber = getApiaryNumber(specialNumber)
  const maxLengthOfSpecialNumber = 5
  const isNumberExist = data?.map(i => i.apiaryNumber).includes(Number(apiaryNumber))

  useEffect(() => {
    if (data) {
      setSpecialNumber(newSpecialNumber)
    }
  }, [newSpecialNumber])

  useEffect(() => {
    setApiaryNumber(newApiaryNumber)

  }, [newApiaryNumber])


  const handleSaveSpecialNumber = () => {
    if (isNumberExist) {
      alert('Wybrany numer pasieki już istnieje')
    } else {
      setEditSpecialNumber(true)
      setIsEditOpen(false)
    }
  }

  const handleCreateApiary = (value: ApiaryModel) => {
    if (!isEditOpen) {
      createApiary({
        apiaryName: value.apiaryName,
        apiaryNumber: Number(apiaryNumber),
        specialNumber: Number(specialNumber),
        editSpecialNumber: editSpecialNumber
      })
      setIsModalOpen(false)
      setEditSpecialNumber(false)
      setSpecialNumber(newSpecialNumber)
    }
  }


  const changeSpecialNumber = (e: { target: { value: React.SetStateAction<number | undefined> } }) => {
    const addLeadingZeros = (num: number, totalLength: number): string => {
      return String(num).padStart(totalLength, '0');
    }
    const editNumber = addLeadingZeros(Number(e.target.value), maxLengthOfSpecialNumber)
    setSpecialNumber(editNumber)
    setIsEditOpen(true)
  }

  return (
    <div className={styles.header}>
      <TaskButton name={'Dodaj nową pasiekę'} onClick={() => setIsModalOpen(true)} icon={<FiEdit />} bgColor={'green'} color={'white'} />
      <Modal title={'Dodawanie pasieki do rejestru'} closeModal={() => setIsModalOpen(false)} trigger={isModalOpen}>
        <ApiaryForm
          apiaryName=''
          apiaryNumber={Number(apiaryNumber)}
          apiarySpecialNumber={Number(specialNumber)}
          handleCreateApiary={handleCreateApiary}
          setSpacialNumber={(e) => changeSpecialNumber(e)}
          handleSaveSpecialNumber={handleSaveSpecialNumber}
        />
      </Modal>
    </div>
  )
}

export default Header