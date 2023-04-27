import express from 'express';
import { crearProyecto, obtenerProyectos, actualizarProyecto, eliminarProyecto } from '../controllers/proyectoController.js'
import auth from '../middleware/auth.js';
import { check } from 'express-validator';

const proyectosRouter = express.Router()

// Crea proyectos
// api/proyectos
proyectosRouter.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatiorio').not().isEmpty()
    ],
    crearProyecto
)

// Obtener todos los proyectos
proyectosRouter.get('/',
    auth,
    obtenerProyectos
)

// Actualizar proyecto via ID
proyectosRouter.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatiorio').not().isEmpty()
    ],
    actualizarProyecto
)

// Eliminar un proyecto
proyectosRouter.delete('/:id',
    auth,
    eliminarProyecto
)

export default proyectosRouter