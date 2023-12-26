import { pool } from "../db.js"

export const getTasks = async (req, res) => {
    try {

        const [result] = await pool.query('SELECT * FROM tasks ORDER BY createAt ASC')

        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const getTask = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]) // con req.params obetenemos el id colocado en la url de la peticion
        console.log(result)

        //validamos que existe el id solicitado por el cliente
        if (result.length === 0) {
            return res.status(404).json({ message: "Tarea no encontrada" }) // en caso de no existir, le decimos que no se encontró y un estatus 404
        }

        res.json(result[0]) // para buscar por id pues solo devolvemos el objeto, no el array completo, ya no hay id repetidos

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const createTask = async (req, res) => {
    try {
        //extraemos lo que nos envie el user
        const { title, description } = req.body;
        //obtenemos del query el result del array
        const [result] = await pool.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description])
        console.log(result)
        res.json({
            id: result.insertId, //obtenemos el id del query (insert)
            title,
            description
        });
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
export const updateTask = async (req, res) => {
    try {
        // le indicamos que vamos a obtener desde req.body (lo que el usuario envie)
        // const { title, description} = req.body;
        // le enviamos como parametro a la consulta los req.body y como se llaman igual y enviamos en el orden los va actualizar de manera correcta
        const [result] = await pool.query('UPDATE tasks SET ? WHERE id = ?', [req.body, req.params.id])
        console.log(result);
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
export const deleteTask = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id])
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No task found' })
        }
        return res.sendStatus(204)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
