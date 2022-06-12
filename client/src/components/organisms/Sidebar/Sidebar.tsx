import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'

import { MdArrowForwardIos } from "react-icons/md";
import { GrTask } from "react-icons/gr";

const menuItems = [
  {
    name: 'Pasielki',
    path: '/',
    icon: <GrTask />
  },
]

const Sidebar: React.FC = () => {
  const location = useLocation()
  const [isSidebarOpen, setISSidebarOpen] = useState(true)

  return (
    <nav className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarHidden : styles.sidebar}`}>
      <button
        className={`${styles.navButton} ${isSidebarOpen ? styles.navButton : styles.navButtonHidden}`}
        onClick={() => setISSidebarOpen((p) => !p)}>
        <MdArrowForwardIos />
      </button>
      <ul className={styles.linksContainer}>
        {menuItems.map((item) => (
          <li key={item.name}
            className={styles.navItem}
          >
            <Link
              to={item.path}
            >
              <div className={`${styles.navLink} ${location.pathname === item.path ? styles.active : styles.navLink}`}>
                <div className={styles.icon}>{item.icon}</div>
                <p>{!isSidebarOpen ? item.name : null}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar