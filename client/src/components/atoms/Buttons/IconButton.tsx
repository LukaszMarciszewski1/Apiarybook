import React from 'react'
import { MdMargin } from 'react-icons/md'
import styles from './styles.module.scss'

type ButtonPropsStyle = {
  margin?: string
  bgColor?: string
  color?: string
}
interface IconButtonProps extends ButtonPropsStyle {
  onClick?: () => void;
  children: JSX.Element
  title?: string
}

const IconButton: React.FC<IconButtonProps> = ({children, onClick, title, margin, bgColor, color}) => (
  <button
    className={styles.iconButton}
    title={title}
    onClick={onClick}
    type='button'
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

export default IconButton