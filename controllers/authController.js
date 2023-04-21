import Usuario from '../models/Usuario.js'
import bcryptjs from 'bcryptjs'
import { validationResult } from 'express-validator'
import jwt  from 'jsonwebtoken'

export const autenticarUsuario = async (req,res) => {

    // Revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    // Extraer email y password
    const { email, password } = req.body


    try {
        // Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email})
        if(!usuario) {
            return res.status(404).json({msg: 'El usuario no existe'})
        }

        // Revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password)
        if(!passCorrecto) {
            return res.status(400).json({msg: 'Password incorrecto'})
        }

        // Si todo es correcto crear y firmar el JWT
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
    }


}
 
export default autenticarUsuario;