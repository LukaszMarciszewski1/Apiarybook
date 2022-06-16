import React, { useRef } from 'react'
import styles from './styles.module.scss'
import { BsXLg } from "react-icons/bs";
import IconButton from '../../atoms/Buttons/Button';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

type PopupProps = {
  trigger: boolean
  title: string
  closePopup: () => void
  children: JSX.Element | JSX.Element[];
}

const Popup: React.FC<PopupProps> = ({ children, trigger, title, closePopup }) => {
  const refPopup = useRef(null)
  useOnClickOutside(refPopup, closePopup)

  return (
    trigger ? (
        <div className={styles.popup} ref={refPopup}>
          <div className={styles.header}>
            <h3>{title}</h3>
            <IconButton onClick={closePopup}><BsXLg /></IconButton>
          </div>
          <div className={styles.popupContent}>
            {children}
          </div>
        </div>
    ) : null
  )
}

export default Popup