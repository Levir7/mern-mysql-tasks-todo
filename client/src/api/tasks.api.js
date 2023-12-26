import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL
//es importante cerrar con punto y coma al terminar el async por que si no, no muestra nada en consola
export const getTasksRequest = async () => 
    await axios.get(`${URL}/tasks`);

// con axios enviamos datos a la api
export const createTaskRequest = async (task) => 
     await axios.post(`${URL}/tasks`, task);

export const deleteTaskRequest = async (id) => 
    await axios.delete(`${URL}/tasks/${id}`)

export const getTaskRequest = async (id) => 
    await axios.get(`${URL}/tasks/${id}`)

export const updateTaskRequest = async (id, newFields) => 
    await axios.put(`${URL}/tasks/${id}`, newFields)

export const toggleTaskDoneRequest = async (id, done) => {
    await axios.put(`${URL}/tasks/${id}`, {
        done
    })}