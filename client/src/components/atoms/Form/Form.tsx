import React, {forwardRef} from 'react'
import styles from './styles.module.scss'
import SubmitButton from '../Buttons/SubmitButton';

interface FormProps {
  handleSubmit: (value: any) => void
  children: JSX.Element | JSX.Element[]
}

const Form: React.FC<FormProps> = ({ children, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {children}
    </form>
  )
}

export default Form

// const Form: React.FC<FormProps> = forwardRef<HTMLFormElement, FormProps>(
//   (
//     {
//       children,
//       handleSubmit,
//       ...props
//     },
//     ref
//   ) => {
//     return (
//     <form onSubmit={handleSubmit} ref={ref} className={styles.form}>
//       {children}
//       <SubmitButton title={'Dodaj'} type="submit" />
//     </form>
//     )
//   }
// )
// export default Form







// import React, { useState, useEffect } from 'react'
// import styles from './styles.module.scss'
// import { useForm, SubmitHandler } from 'react-hook-form';
// import Button from '../../atoms/Buttons/Button';

// import {
//   useGetAllApiariesQuery,
//   useGetApiaryQuery,
//   useCreateApiaryMutation,
//   useUpdateApiaryMutation,
//   useDeleteApiaryMutation,
// } from "../../../store/api/apiaries";

// import Input from '../../atoms/Input/Input'

// type FormValues = {
//   apiaryName: string;
//   apiaryNumber: number;
// };

// interface FormProps extends FormValues {
//   setSubmit: (value: any) => void
// }

// const Form: React.FC<FormProps> = ({apiaryName, apiaryNumber, setSubmit}) => {
//   const [createApiary] = useCreateApiaryMutation()
//   const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
//     defaultValues: {
//       apiaryName: "",
//       apiaryNumber: 1000
//     },
//   });

//   const onSubmit = (data: FormValues) => {
//     createApiary({
//       apiaryName: data.apiaryName,
//       apiaryNumber: Number(data.apiaryNumber)
//     })
//     reset()
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
//       <div className={styles.formGroup}>
//           <label htmlFor="apiaryName">Nazwa pasieki</label>
//           <Input
//            id={'apiaryName'}
//            placeholder={'Nazwa pasieki'}
//            label={'Nazwa pasieki'}
//            type="text"
//            {...register("apiaryName", { required: true })}
//         />
//         {errors?.apiaryName && <p>Nazwa pasieki jest wymagana</p>}
//       </div>
//       <div className={styles.formGroup}>
//         <label htmlFor="apiaryNumber">Numer specjalny</label>
//         <Input
//            id={'apiaryNumber'}
//            placeholder={'Numer specjalny'}
//            label={'Numer specjalny'}
//            type="number"
//            {...register("apiaryNumber", { required: true })}
//            disabled={true}
//         />
//         {errors?.apiaryNumber && <p>{errors.apiaryNumber.message}</p>}
//       </div>
//       <Button title={'Dodaj'} type="submit" bgColor={'#007bff'}/>
//     </form>
//   )
// }

// export default Form