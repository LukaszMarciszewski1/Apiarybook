import React from 'react'
import styles from './styles.module.scss'
import Appbar from '../components/organisms/Appbar/Appbar'
import Container from '../components/templates/Container/Container'
import Sidebar from '../components/organisms/Sidebar/Sidebar'
import ApiaryPage from './ApiaryPage/ApiaryPage'
const Root = () => {
  return (
    <div className={styles.root}>
      <Appbar />
      <Container>
        <Sidebar />
        <ApiaryPage />
      </Container>
    </div>
  )
}

export default Root