import React from 'react'
import styles from './styles.module.scss'

interface IconButtonProps {
  onClick?: () => void;
  children: JSX.Element
  title?: string
}

const IconButton: React.FC<IconButtonProps> = ({children, onClick, title}) => (
  <button
    className={styles.iconButton}
    title={title}
    onClick={onClick}
    type='button'
  >
    {children}
  </button>
)

export default IconButton