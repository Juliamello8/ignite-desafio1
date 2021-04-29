import { useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title?: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    const rand = Math.floor(Math.random() * 999)

    if (newTaskTitle !== '') {
      setTasks([
        ...tasks,
        {
          id: rand,
          title: newTaskTitle,
          isComplete: false,
        }
      ])
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const otherTasks = tasks.filter(task => task.id !== id);
    const taskToEdit = tasks.find(task => task.id === id);

    if (!taskToEdit) {
      console.log("Task não encontrada!")
      return;
    } else {
      if (taskToEdit.isComplete === false) {
        taskToEdit.isComplete = true;
      } else {
        taskToEdit.isComplete = false;
      }
      setTasks([
        ...otherTasks,
        taskToEdit
      ]);
    }
  }

  function handleRemoveTask(id: number) {
    const otherTasks = tasks.filter(task => task.id !== id);
    const taskToExclude = tasks.find(task => task.id === id);

    if (!taskToExclude) {
      console.log("Task não encontrada!")
      return;
    } else {
      setTasks([
        ...otherTasks
      ]);
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}

function setToggleTaskCompleted(arg0: boolean) {
  throw new Error('Function not implemented.');
}
