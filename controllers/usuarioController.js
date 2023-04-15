import Usuario from '../models/Usuario.js'

export const crearUsuario = async (req,res) => {
    
    try {
        let usuario

        // crear el nuevo usuario
        usuario = new Usuario(req.body)
        await usuario.save()

        // Mensaje de confirmacion
        res.send('Usuario creado correctamente')
        // guardar el nuevo usuario
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error')
    }
}

export default crearUsuario;