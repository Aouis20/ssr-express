import React from 'react'
import '../styles/task.css'

const Task = ({task}) => {
  return (
    <li className='task'>
      <p>Title: {task.title}</p>
      <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
    </li>
  )
}

export default Task