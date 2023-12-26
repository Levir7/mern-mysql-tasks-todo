import axios from 'axios';
//es importante cerrar con punto y coma al terminar el async por que si no, no muestra nada en consola
export const getTasksRequest = async () => 
    await axios.get('http://localhost:4000/tasks');


// con axios enviamos datos a la api
export const createTaskRequest = async (task) => 
     await axios.post('http://localhost:4000/tasks', task);

export const deleteTaskRequest = async (id) => 
    await axios.delete(`http://localhost:4000/tasks/${id}`)

export const getTaskRequest = async (id) => 
    await axios.get(`http://localhost:4000/tasks/${id}`)

export const updateTaskRequest = async (id, newFields) => 
    await axios.put(`http://localhost:4000/tasks/${id}`, newFields)

export const toggleTaskDoneRequest = async (id, done) => {
    await axios.put(`http://localhost:4000/tasks/${id}`, {
        done
    })}