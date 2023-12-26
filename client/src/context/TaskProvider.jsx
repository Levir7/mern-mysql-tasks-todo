import { createContext, useContext } from "react";
import { useState } from "react";
import {
  deleteTaskRequest,
  getTaskRequest,
  createTaskRequest,
  getTasksRequest,
  updateTaskRequest,
  toggleTaskDoneRequest,
} from "../api/tasks.api";
import { TaskContext } from "./TaskContext";

export const TaskContextProvider = ({ children }) => {
  //creamos un estado y le mandamos un arreglo como default
  const [tasks, setTasks] = useState([]);

  // creamos una funcion async para poder ejecutar la funcion donde vamos al backend a consultar la bd
  async function loadTask() {
    try {
      // mandamos a ejecutar la funcion y esperamos a que se termine de ejecutar
      const response = await getTasksRequest();
      //guardamos en el task el arreglo del request desde el backend
      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al cargar la tarea:", error);
    }
  }
  //funcion para eliminar tareas
  const deleteTask = async (id) => {
    try {
      const response = await deleteTaskRequest(id);
      // ya que los borró, se vuelve a enviar al array tasks los datos sin el id que se ha eliminado
      setTasks(tasks.filter((task) => task.id !== id));
      console.log(response);
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  const createTask = async (task) => {
    try {
      const response = await createTaskRequest(task);
      // setTasks([...tasks, response.data]) // ? esta es otra manera de mandarle los datos al arreglo tasks,pero no es necesario en este caso ya que al cargar en la pagina donde se encuentra el array en uso, se ejecuta la funcion loadTask que practicamente hace lo mismo con el request GET a la api
      console.log(response);
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  const getTask = async (id) => {
    try {
      const response = await getTaskRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, newFields) => {
    try {
      const response = await updateTaskRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTaskDone = async (id) => {
    try {
      const taskFound = tasks.find((task) => {
        return task.id === id;
      });
      await toggleTaskDoneRequest(id, taskFound.done === 0 ? 1 : 0);
      setTasks(
        tasks.map((task) =>
           (task.id === id ? { ...task, done: !task.done } : task))
      );
          console.log(tasks)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadTask,
        deleteTask,
        createTask,
        getTask,
        updateTask,
        toggleTaskDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw Error("useTask must be used within a TaskContextProvider");
  }

  return context;
};
