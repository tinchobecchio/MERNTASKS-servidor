import Proyecto from '../models/Proyecto.js'

export const crearProyecto = (req,res) => {

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

export default crearProyecto;