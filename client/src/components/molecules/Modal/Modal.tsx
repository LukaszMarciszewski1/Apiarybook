import React, { useRef } from 'react'
import styles from './styles.module.scss'
import { BsXLg } from "react-icons/bs";
import IconButton from '../../atoms/Buttons/IconButton';

type ModalProps = {
  trigger?: boolean
  title: string
  closeModal: () => void
  children: JSX.Element | JSX.Element[];
}

const Modal: React.FC<ModalProps> = ({ children, trigger, title, closeModal }) => {
  const refModal = useRef(null)
  // useOnClickOutside(refPopup, closePopup)

  return (
    trigger ? (
      <div className={styles.popup} ref={refModal}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <IconButton onClick={closeModal}><BsXLg /></IconButton>
        </div>
        <div className={styles.popupContent}>
          {children}
        </div>
      </div>
    ) : null
  )
}

export default Modal