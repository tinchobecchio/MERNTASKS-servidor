// Rutas para autenticar usuarios
import express from 'express'
import { check } from 'express-validator'
import { autenticarUsuario, usuarioAutenticado } from '../controllers/authController.js'
import auth from '../middleware/auth.js'

const authRouter = express.Router()

// Iniciar Sesion
// api/auth
authRouter.post('/', 
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
    ],
    autenticarUsuario
);

// Obtiene el usuario autenticado
authRouter.get('/',
    auth,
    usuarioAutenticado    
)

export default authRouter