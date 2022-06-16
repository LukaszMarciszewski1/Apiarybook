import React from 'react'
import styles from './styles.module.scss'

type ButtonPropsStyle = {
  margin?: string
  bgColor?: string
  color?: string
}
interface IconButtonProps extends ButtonPropsStyle {
  onClick?: () => void;
  children?: JSX.Element
  title?: string
  disabled?: boolean
}

const Button: React.FC<IconButtonProps> = ({children, onClick, title, margin, bgColor, color,  disabled}) => (
  <button
    className={styles.iconButton}
    onClick={onClick}
    type='button'
    disabled={disabled}
    style={{
      margin: margin,
      color: color,
      backgroundColor: bgColor,
    }}
  >
    {children}
    {title}
  </button>
)

export default Button