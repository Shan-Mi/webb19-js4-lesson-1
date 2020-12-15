import React, {useState} from 'react'
import TodoCreate from './components/Todo/TodoCreate';
import TodoItem from './components/Todo/TodoItem';
import { TaskContext } from "./contexts/TaskContext"

const todoList = [
  {
    id: 1,
    task: "Do the laundry!",
    dueDate: new Date(2020, 11, 14, 10, 30),
    isCompleted: false,
    priority: 11,
  },
  {
    id: 2,
    task: "Do the dishes!",
    dueDate: new Date(2020, 11, 14, 11, 0),
    isCompleted: true,
    priority: 10,
  },
  {
    id: 3,
    task: "Make the bed",
    dueDate: new Date(2020, 11, 14, 6, 30),
    isCompleted: false,
    priority: 1,
  },
]

function App() {
  const [taskList, setTaskList] = useState(todoList)

  return (
    <TaskContext.Provider value={{taskList, setTaskList}}>
      <div>
        <h1>World's ugliest Todo App</h1>
        <TodoCreate />
        <hr/>
        Hej
        {taskList.map(todoItem => {
          return (
            <TodoItem key={todoItem.id} todoItem={todoItem} />
          )
        })}
      </div>
    </TaskContext.Provider>
  );
}

export default App;
