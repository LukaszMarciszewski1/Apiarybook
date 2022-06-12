import React from 'react'
import styles from './styles.module.scss'
import Header from '../../components/organisms/Header/Header'
import ApiariesList from '../../components/organisms/ApiariesList/ApiariesList'

const ApiaryPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <ApiariesList />
    </div>
  )
}

export default ApiaryPage