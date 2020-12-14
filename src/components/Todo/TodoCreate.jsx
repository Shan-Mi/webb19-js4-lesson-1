import React, {useState, useContext} from 'react'
import { TaskContext } from '../../contexts/TaskContext'

export default function TodoCreate() {
  const {setTaskList} = useContext(TaskContext)
  const now = new Date()
  const nowString = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
  const [textInput, setTextInput] = useState("")
  const [dateInput, setDateInput] = useState(nowString)

  function handleOnDateChange(e) {
    const value = e.target.value
    setDateInput(value)
  }

  function handleOnSubmit(e) {
    e.preventDefault()
    const dateArray = dateInput.split("-")
    const dueDate = new Date(dateArray[0], --dateArray[1], dateArray[2])

    console.log("submitting..")
    const payload = {
      id: Date.now(),
      task: textInput,
      dueDate: dueDate,
      isCompleted: false,
      priority: 1,
    }
    console.log(payload)
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
      <button type="submit">Add task</button>

      {/* Todo: Add Time */}
    </form>
  )
}
