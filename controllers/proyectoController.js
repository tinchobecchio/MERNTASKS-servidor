import Proyecto from '../models/Proyecto.js'
import { validationResult } from 'express-validator'

export const crearProyecto = (req,res) => {

    // Revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }


    try {
        //Crear un nuevo Proyecto
        const proyecto = new Proyecto(req.body)

        // Guardar el creador via JWT
        proyecto.creador = req.usuario.id

        // Guardar proyecto
        proyecto.save()
        res.json(proyecto)
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

// Obtiene todos los proyectos del usuario actual
export const obtenerProyectos = async (req,res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1})
        res.json(proyectos)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}


// Actualiza un proyecto
export const actualizarProyecto = async (req,res) => {

    // Revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    // extraer la informacion del proyecto
    const { nombre } = req.body
    const nuevoProyecto = {}

    if(nombre) {
        nuevoProyecto.nombre = nombre
    }

    try {
        // Revisar el ID
        let proyecto = await Proyecto.findById(req.params.id)

        // si el proyecto existe o no
        if(!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'})
        }

        // actualizar
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id}, {$set : nuevoProyecto}, {new : true})

        res.json({proyecto})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }

}