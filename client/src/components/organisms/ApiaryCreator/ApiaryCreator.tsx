import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import Modal from '../../molecules/Modal/Modal'
import Form from '../../atoms/Form/Form'
import FormGroup from '../../atoms/Form/FormGroup';
import Input from '../../atoms/Input/Input'
import IconButton from '../../atoms/Buttons/IconButton';
import { FiEdit } from "react-icons/fi";

import {
  useCreateApiaryMutation
} from "../../../store/api/apiaries";

type FormValues = {
  apiaryName: string
  apiaryNumber: number
};

const ApiaryCreator = () => {
  const [isNumberDisabled, setIsNumberDisabled] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [num, setNum] = useState('')
  const [createApiary] = useCreateApiaryMutation()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      apiaryName: "",
      apiaryNumber: 1000
    }
  })

  const handleCreateApiary = (data: FormValues) => {
    const limit = 5
    if(Number(data.apiaryNumber) > 5) {
      console.log('jest')
    }
    createApiary({
      apiaryName: data.apiaryName,
      apiaryNumber: Number(data.apiaryNumber)
    })
    reset()
    console.log(data.apiaryNumber)
  }

  const handleEditApiaryNumber = () => {
    setIsNumberDisabled(false)
  }

  const handleNumChange = (e: { target: { value: string; }; }) => {
    if(e.target.value.length > 5){
      // const limit = 4;
      // e.target.value.slice(0, limit)
      console.log('eee')
    }
  };

  return (
    <Modal title={'Dodawanie pasieki do rejestru'} closeModal={() => console.log('close')} trigger={isModalOpen}>
      <Form handleSubmit={handleSubmit(handleCreateApiary)}>
        <FormGroup
          label={'Nazwa pasieki'}
          htmlFor={'apiaryName'}
          error={errors?.apiaryName}
          errorMessage="Nazwa pasieki jest wymagana"
        >
          <Input
            id={'apiaryName'}
            placeholder={'Nazwa pasieki'}
            label={'Nazwa pasieki'}
            type="text"
            {...register("apiaryName", { required: true })}
          />
        </FormGroup>
        <FormGroup
          label={'Numer pasieki'}
          htmlFor={'apiaryNumber'}
          error={errors?.apiaryNumber}
          errorMessage="Numer pasieki jest nieprawidłowy"
        >
          <Input
            id={'apiaryNumber'}
            placeholder={'Numer Pasieki'}
            label={'Numer Pasieki'}
            type="number"
            {...register("apiaryNumber", { required: true , pattern: /[0-9]{5}/, maxLength: 5})}
            disabled={isNumberDisabled}
            // value={888}
            onChange={handleNumChange}
          />
          <IconButton title={'Edytuj numer pasieki'} onClick={handleEditApiaryNumber}><FiEdit /></IconButton>
        </FormGroup>
      </Form>
    </Modal>
  )
}

export default ApiaryCreator