// Rutas para autenticar usuarios
import express from 'express'
import { check } from 'express-validator'
import { autenticarUsuario } from '../controllers/authController.js'

const authRouter = express.Router()

// api/auth
authRouter.post('/', 
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
    ],
    autenticarUsuario
);

export default authRouter