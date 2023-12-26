import express from 'express';
import {fileURLToPath} from 'url'
import {dirname, join} from 'path'
import cors from 'cors'
import { PORT } from './config.js';
import indexRoutes from './routes/index.routes.js';
import taskRoutes from './routes/task.routes.js'; // aqui puedes llamarlo como gustes al router del archivo (tasks)
const app = express();
// const __dirname = dirname(fileURLToPath(import.meta.url)) 

app.use(cors({
    origin: process.env.FRONTEND_URL ||'http://localhost:5173' // le indicamos desde que servidor se pueden recibir datos
}))

app.use(express.json()); //procesar los datos del cliente como json
// app.use(express.static(join(__dirname, '../client/dist')))

app.use(indexRoutes)
app.use(taskRoutes); 

app.listen(process.env.PORT || 4000);
console.log(`sever listening on port ${4000}`);

