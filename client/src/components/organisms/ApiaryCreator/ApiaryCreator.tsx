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

interface ApiaryCreatorProps {
  apiaryName?: string
  apiaryNumber?: number
  handleCreateApiary: (e: any) => void
  handleEditApiaryNumber?: () => void
}

const ApiaryCreator:React.FC<ApiaryCreatorProps> = ({apiaryName, apiaryNumber, handleCreateApiary}) => {
  const [isNumberDisabled, setIsNumberDisabled] = useState(true)
  const [num, setNum] = useState('')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      apiaryName: apiaryName,
      apiaryNumber: apiaryNumber
    }
  })

  const onSubmit = (data: FormValues) => {
    if(Number(data.apiaryNumber) > 5) {
      console.log('jest')
    }
    if(data){
      handleCreateApiary(data)
    }
    reset()
  }

  const handleEditApiaryNumber = () => {
    setIsNumberDisabled(false)
  }

  const handleNumChange = (e: { target: { value: string; }; }) => {
    console.log(e.target.value.length)
  };

  return (
      <Form handleSubmit={handleSubmit(onSubmit)}>
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
          htmlFor={'number'}
          error={errors?.apiaryNumber}
          errorMessage="Numer pasieki jest nieprawidłowy"
        >
          <Input
            id={'number'}
            placeholder={'Numer Pasieki'}
            label={'Numer Pasieki'}
            type="number"
            {...register("apiaryNumber", { required: true , pattern: /[0-9]{16}/, maxLength: 16})}
            disabled={isNumberDisabled}
          />
          <IconButton onClick={handleEditApiaryNumber}><FiEdit /></IconButton>
        </FormGroup>
      </Form>
  )
}

export default ApiaryCreator