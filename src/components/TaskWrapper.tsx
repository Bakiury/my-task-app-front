import { useEffect, useState } from 'react';
import { ITask } from '../interfaces';
import TaskForm from './TaskForm';
import Task from './Task';
import EditTask from './TaskEdit';
import { getTasksApi, getTaskApi, addTaskApi, editTaskApi, deleteTaskApi } from '../api';
import TaskModal from './TaskModal';

const TaskWrapper: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [viewTask, setViewTask] = useState<ITask | undefined>();

  const addTask = (title: string, description: string) => {
    addTaskApi(title, description)
      .then(newTask => {
        setTasks([...tasks, newTask]);
      })
      .catch(console.error);
  };
  const toggleCompleted = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    const taskToUpdate = updatedTasks.find(task => task.id === id);
    if (taskToUpdate) {
      editTaskApi(id, { completed: taskToUpdate.completed })
        .then(updatedTask => {
          const updatedTasks = tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
          );
          setTasks(updatedTasks);
        })
        .catch(console.error);
    }
  };
  const viewDetail = (id: string) => {
    getTaskApi(id)
      .then(updatedTask => {
        if (updatedTask) {
          setViewTask(updatedTask);
          console.log(updatedTask);
        }
      })
      .catch(console.error);
  };

  const deleteTask = (id: string) => {
    deleteTaskApi(id)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id))
      })
      .catch(console.error);
  };
  const getTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id
      ? { ...task, isEditing: !task.isEditing }
      : task
    ));
  };
  const editTask = (title: string, id: string) => {
    editTaskApi(id, { title })
      .then(updatedTask => {
        const updatedTasks = tasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
      })
      .catch(console.error);
  };
  const handleCloseModal = (value: boolean) => {
    if (!value) setViewTask(undefined);
  };

  useEffect(() => {
    getTasksApi()
      .then(setTasks)
      .catch(console.error);
  }, []);

  return (
    <div className='task-wrapper'>
      {viewTask && <TaskModal data={viewTask} close={handleCloseModal} />}
      <h1>My Tasks!</h1>
      <br />
      <TaskForm addTask={addTask} />
      <br />
      <div className='list-box'>
        {
          tasks.map((task) => (
            task.isEditing
              ? <EditTask data={task} key={task.id} editTask={editTask} />
              : <Task data={task} key={task.id} toggleCompleted={toggleCompleted} viewDetail={viewDetail} deleteTask={deleteTask} getTask={getTask} />
          ))
        }
      </div>
    </div>
  );
};

export default TaskWrapper;
