import Tarea from "../models/Tarea.js";
import Proyecto from "../models/Proyecto.js";
import { validationResult } from 'express-validator'


// Crea una nueva tarea
export const crearTarea = async(req,res) => {

    // Revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    // Extraer el proyecto y comprobar si existe
    const { proyecto } = req.body
    try {
        // Revisar si existe el proyecto
        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'})
        }

        // Creamos la tarea
        const tarea = new Tarea(req.body)
        await tarea.save()
        res.json({tarea})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
    
}

// Obtiene las tareas por proyecto
export const obtenerTareas = async(req,res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body

        // Revisar si existe el proyecto
        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'})
        }

        // Obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto })
        res.json({tareas})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

// Actualizar una tarea
export const actualizarTarea = async (req,res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body

        // Si la tarea existe o no
        let tarea = Tarea.findById(req.params.id)

        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea'})
        }

        // Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto)


        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'})
        }

        // Crear un objeto con la nueva informacion
        const nuevaTarea = {}
        if(nombre) nuevaTarea.nombre = nombre
        if(estado) nuevaTarea.estado = estado

        // Guardar la tarea
        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, { new: true})

        res.json({tarea})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

// Elimina una tarea
export const eliminarTarea = async (req,res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body

        // Si la tarea existe o no
        let tarea = Tarea.findById(req.params.id)

        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea'})
        }

        // Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto)


        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'})
        }

        // Eliminar
        await Tarea.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Tarea eliminada'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}