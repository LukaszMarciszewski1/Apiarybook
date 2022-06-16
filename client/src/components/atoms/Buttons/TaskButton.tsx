import React from 'react'
import styles from './styles.module.scss'

type ButtonPropsStyle = {
  height?: string
  width?: string
  margin?: string
  bgColor?: string
  color?: string
}

interface TaskButtonProps extends ButtonPropsStyle {
  icon?: JSX.Element
  name?: string
  onClick: () => void
}

const TaskButton: React.FC<TaskButtonProps> = ({ onClick, name, icon, width, height, margin, bgColor, color }) => {
  return (
    <button style={{
      width: width,
      height: height,
      margin: margin,
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