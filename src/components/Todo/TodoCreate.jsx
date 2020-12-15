import React, {useState, useContext} from 'react'
import { TaskContext } from '../../contexts/TaskContext'

function pad(num) {
  return num < 10 ? '0'+num : num
}

export default function TodoCreate() {
  const {setTaskList} = useContext(TaskContext)
  const now = new Date()
  const nowString = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
  const timeString = `${pad(now.getHours())}:${pad(now.getMinutes())}`
  const [textInput, setTextInput] = useState("")
  const [dateInput, setDateInput] = useState(nowString)
  const [timeInput, setTimeInput] = useState(timeString)
  const [priorityInput, setPriorityInput] = useState(1)

  function handleOnDateChange(e) {
    const value = e.target.value
    setDateInput(value)
  }

  function handleOnTimeChange(e) {
    setTimeInput(e.target.value)
  }

  function handleOnPriorityChange(e) {
    setPriorityInput(e.target.value)
  }

  function handleOnSubmit(e) {
    e.preventDefault()
    const dateArray = dateInput.split("-")
    const timeArray = timeInput.split(":")
    const dueDate = new Date(
      dateArray[0], --dateArray[1], dateArray[2],
      timeArray[0], timeArray[1]
    )

    const payload = {
      id: Date.now(),
      task: textInput,
      dueDate: dueDate,
      isCompleted: false,
      priority: priorityInput,
    }

    setTaskList(prevState => ([...prevState, payload]))
  }
  
  return (
    <form onSubmit={handleOnSubmit}>
      <input 
        type="text" placeholder="New Todo" 
        value={textInput}
        onChange={e => setTextInput(e.target.value)}
      />
      <input 
        type="date" placeholder="2020-12-01" 
        value={dateInput}
        onChange={e => handleOnDateChange(e)}
      />

      <input
        type="time" placeholder="10:00"
        value={timeInput}
        onChange={e => handleOnTimeChange(e)}
      />

      <input
        type="number" placeholder="1"
        value={priorityInput}
        onChange={e => handleOnPriorityChange(e)}
      />

      <button type="submit">Add task</button>

      {/* Todo: Add Time */}
    </form>
  )
}
