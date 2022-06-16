import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Form from '../../atoms/Form/Form'
import FormGroup from '../../atoms/Form/FormGroup';
import Input from '../../atoms/Input/Input'
import IconButton from '../../atoms/Buttons/Button';
import SubmitButton from '../../atoms/Buttons/SubmitButton';

type FormValues = {
  apiaryName: string
  apiaryNumber: number
  apiarySpecialNumber: number
};

interface ApiaryCreatorProps extends FormValues {
  handleCreateApiary: (e: any) => void
  handleSaveSpecialNumber: () => void
  setSpacialNumber: (e: any) => void
}

const ApiaryForm: React.FC<ApiaryCreatorProps> = ({
  apiaryName,
  apiaryNumber,
  apiarySpecialNumber,
  handleCreateApiary,
  handleSaveSpecialNumber,
  setSpacialNumber,
}) => {
  const [isNumberDisabled, setIsNumberDisabled] = useState(true)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      apiaryName: apiaryName,
      apiaryNumber: apiaryNumber,
      apiarySpecialNumber: apiarySpecialNumber
    }
  })
  const [isOpenEditSpacialNumber, setIsOpenEditSpacialNumber] = useState(false)

  const editApiaryNumber = () => {
    setIsNumberDisabled(false)
    setIsOpenEditSpacialNumber(true)
  }

  const saveSpecialNumber = () => {
    setIsOpenEditSpacialNumber(false)
    setIsNumberDisabled(true)
    handleSaveSpecialNumber()
  }

  return (
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
        htmlFor={'number'}
        error={errors?.apiaryNumber}
        errorMessage="Numer pasieki jest nieprawidłowy"
      >
        <Input
          id={'number'}
          placeholder={'Numer Pasieki'}
          label={'Numer Pasieki'}
          type="number"
          {...register("apiaryNumber", { required: true, pattern: /[0-9]{16}/, maxLength: 16 })}
          disabled={true}
          value={apiaryNumber}
        />
      </FormGroup>
      <FormGroup
        label={'Numer specjalny'}
        htmlFor={'apiarySpecialNumber'}
        error={errors?.apiarySpecialNumber}
        errorMessage="Numer pasieki jest nieprawidłowy"
      >
        <Input
          id={'apiarySpecialNumber'}
          placeholder={'Numer specjalny'}
          label={'Numer specjalny'}
          type="number"
          {...register("apiarySpecialNumber", { required: true })}
          onChange={(e) => {
            if (e.target.value.length > 5) {
              e.target.value = e.target.value.slice(0, 5)
              e.preventDefault()
              return
            }
            setSpacialNumber(e)
          }}
          disabled={isNumberDisabled}
        />
        {
          isOpenEditSpacialNumber ? (
            <IconButton
              title={'Zapisz'}
              onClick={saveSpecialNumber}
              bgColor={'rgb(13, 97, 146)'}
              color={'white'}
              margin={'0 0 0 10px'}
            />
          ) : (
            <IconButton title={'Edytuj'} onClick={editApiaryNumber} />
          )
        }
      </FormGroup>
        <SubmitButton title={'Dodaj'} type="submit" />
    </Form>
  )
}

export default ApiaryForm