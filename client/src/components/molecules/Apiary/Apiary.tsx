import React from 'react'
import styles from './styles.module.scss'
import { Apiary as ApiaryModel } from '../../../models/apiary'
interface ApiaryProps extends ApiaryModel {
  handleEdit: () => void
  editAction?: JSX.Element
}

const Apiary: React.FC<ApiaryProps> = ({ apiaryName, apiaryNumber, createdAt, updatedAt, editAction }) => {
  return (
      <tr className={styles.tbody}>
        <td>{apiaryName}</td>
        <td>{apiaryNumber}</td>
        <td>{createdAt}</td>
        <td>{updatedAt}</td>
        <td style={{ width: '100px', textAlign: 'center', verticalAlign: 'middle' }}>
          <span style={{ width: '50px' }}>
            {editAction}
          </span>
        </td>
      </tr>
  )
}

export default Apiary