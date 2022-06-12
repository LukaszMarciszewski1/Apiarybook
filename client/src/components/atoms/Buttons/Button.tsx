import React from 'react'
import styles from './styles.module.scss'

type ButtonPropsStyle = {
  height?: string
  margin?: string
  width?: string
  bgColor?: string
  color?: string
}

interface TaskButtonProps extends ButtonPropsStyle {
  icon?: JSX.Element
  name?: string
  onClick: () => void
}

const TaskButton: React.FC<TaskButtonProps> = ({ onClick, name, icon, height, margin, width, bgColor, color }) => {
  return (
    <button style={{
      height: height,
      margin: margin,
      width: width,
      backgroundColor: bgColor,
      color: color
    }}
      className={styles.taskButton}
      onClick={onClick}>
      <div className={styles.icon}>{icon}</div>
      {name}
    </button>
  )
}

export default TaskButton