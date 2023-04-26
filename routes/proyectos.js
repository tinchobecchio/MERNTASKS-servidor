import express from 'express';
import { crearProyecto } from '../controllers/proyectoController.js'
import auth from '../middleware/auth.js';

const proyectosRouter = express.Router()

// Crea proyectos
// api/proyectos
proyectosRouter.post('/',
    auth,
    crearProyecto
)

proyectosRouter.get('/',
    auth,
    crearProyecto
)


export default proyectosRouter