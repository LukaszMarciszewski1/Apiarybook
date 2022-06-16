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