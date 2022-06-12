import React from 'react'
import styles from './styles.module.scss'

interface PageContainerProps {
  children: JSX.Element | JSX.Element[];
}

const PageContainer:React.FC<PageContainerProps> = ({children}) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default PageContainer