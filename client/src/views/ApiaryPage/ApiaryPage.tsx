import React from 'react'
import styles from './styles.module.scss'
import ApiaryCreator from '../../components/organisms/ApiaryCreator/ApiaryCreator'
import ApiariesList from '../../components/organisms/ApiariesList/ApiariesList'

const ApiaryPage = () => {
  return (
    <div className={styles.container}>
      <ApiaryCreator />
      <ApiariesList />
    </div>
  )
}

export default ApiaryPage