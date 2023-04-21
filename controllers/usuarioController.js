import Usuario from '../models/Usuario.js'
import bcryptjs from 'bcryptjs'
import { validationResult } from 'express-validator'
import jwt  from 'jsonwebtoken'

export const crearUsuario = async (req,res) => {
    
    // Revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }


    // extraer email y password
    const { email, password } = req.body

    try {
        // Revisar que el usuario registrado sea unico


        let usuario = await Usuario.findOne({email})

        if(usuario) {
            return res.status(400).json({msg: 'El usuario ya existe'})
        }
        // crear el nuevo usuario
        usuario = new Usuario(req.body)

        // Hashear el password
        const salt = await bcryptjs.genSalt(10)
        usuario.password = await bcryptjs.hash(password, salt)


        // guardar el usuario
        await usuario.save()

        // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        // Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error
            
            // Mensaje de confirmacion
            res.json({ token })
        })


    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error')
    }
}

export default crearUsuario;