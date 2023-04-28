import express from 'express';
import { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } from '../controllers/tareasController.js'
import auth from '../middleware/auth.js';
import { check } from 'express-validator';

const tareasRouter = express.Router()


// Crear una tarea
// api/tareas
tareasRouter.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    crearTarea
)

// Obtener las tareas por proyecto
tareasRouter.get('/',
    auth,
    obtenerTareas
)

// Actualizar tarea
tareasRouter.put('/:id',
    auth,
    actualizarTarea
)

// Eliminar tarea
tareasRouter.delete('/:id',
    auth,
    eliminarTarea
)

export default tareasRouter;