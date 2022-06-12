import React from 'react'
import styles from './styles.module.scss'
import Apiary from '../components/molecules/Apiary/Apiary'
import Form from '../components/atoms/Form/Form'
import ApiaryCreator from '../components/organisms/ApiaryCreator/ApiaryCreator'
import Appbar from '../components/organisms/Appbar/Appbar'
import PageContainer from '../components/templates/PageContainer/PageContainer'

const Root = () => {
  return (
    <div className={styles.root}>
      <Appbar />
      <PageContainer>
        <Apiary />
        <ApiaryCreator />
      </PageContainer>
    </div>
  )
}

export default Root