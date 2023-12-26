import { Form, Formik } from "formik";
import { useTask } from "../context/TaskProvider.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const TaskForm = () => {
  const { createTask, getTask, updateTask } = useTask();
  const [task, setTasks] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();
  const params = useParams();
  // validamos que esxista un parametro en la url que sea id (esto es cuando entramos a editar)
  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setTasks({
          title: task.title,
          description: task.description,
        });
        console.log(task);
      }
    };
    loadTask();
  }, []);
  console.log(params);
  return (
    <div>
      <Formik
        //   estos son los valores iniciales (values que se enviaran en el onsubmit)
        initialValues={task}
        enableReinitialize={true} // con esta propiedad le decimos que permita escribir de nuevo los valores de los campos iniciales de acuerdo a lo que se vaya obteniendo de la consulta
        onSubmit={async (values, actions) => {
          console.log(values);
          if (params.id && values.includes !== "") {
            await updateTask(params.id, values);
            //cuando ya actualice lo redirigmos al home con el navigate
          } else {
            createTask(values);
          }
          navigate("/");
          setTasks({
            title: "",
            description: "",
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10"
            onSubmit={handleSubmit}
          >
            <h1 className="text-xl font-bold uppercase text-center">{params.id ? "Edit Task" : "Create Task"}</h1>
            <label className="block text-lg font-semibold py-1">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Write a Title"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
              value={values.title}
            />

            <label className="block text-lg font-semibold py-1">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Write a description"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
              value={values.description}
            ></textarea>

            <button className="block bg-indigo-700 px-2 py-1 text-white w-full rounded-md" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;
