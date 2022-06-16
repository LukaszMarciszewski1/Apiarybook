import React from 'react'
import styles from './styles.module.scss'

interface ButtonProps {
  onClick?: (e: any) => void
  title: string
  bgColor?: string
  type: "submit" 

}

const SubmitButton: React.FC<ButtonProps> = ({ onClick, bgColor, title, type }) => (
  <button
    className={styles.submitButton}
    onClick={onClick}
    type={type}
    style={{ backgroundColor: `${bgColor}` }}>
    {title}
  </button>
)

export default SubmitButton