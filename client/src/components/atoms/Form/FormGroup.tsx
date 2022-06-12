import React from 'react'
import styles from './styles.module.scss'

interface FormGroupProps {
  children: JSX.Element | JSX.Element[]
  label: string
  error: {} | undefined | ((value: any) => void)
  htmlFor: string
  errorMessage: string 
}

const FormGroup:React.FC<FormGroupProps> = ({children, label, htmlFor, error, errorMessage}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {error && <p>{errorMessage}</p>}
    </div>
  )
}

export default FormGroup