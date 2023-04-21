import express from 'express';
import { crearProyecto } from '../controllers/proyectoController.js'

const proyectosRouter = express.Router()

// Crea proyectos
// api/proyectos
proyectosRouter.post('/',
    crearProyecto
)


export default proyectosRouter