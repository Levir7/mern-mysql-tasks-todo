import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { useTask } from "../context/TaskProvider";
import { Link } from "react-router-dom";

const TasksPage = () => {
  //extraemos desde el context las funciones o valores
  const {tasks, loadTask} = useTask();
  // al entrar al sitio se ejecuta
  useEffect(() => {
    //la ejecutamos parfa que cargue todo al cargar la pagina con el useeffect
    loadTask();
  }, []);

  const renderMain = () => {
    if(tasks.length === 0) return <h2>No Task Yet</h2>
    // por cada task que hay en el arreglo, vamos a ejecutar lo siguiente
    return tasks.map((task) => <TaskCard task={task} key={task.id} />);
  };

  return (
    <div>
      
        <h1 className="text-5xl text-white  font-bold text-center py-4">Task</h1>
      <div className="grid grid-cols-3 gap-2">
        {renderMain()}
      </div>
    </div>
  );
};

export default TasksPage;
