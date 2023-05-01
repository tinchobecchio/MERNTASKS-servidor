// Rutas para autenticar usuarios
import express from 'express'
import { check } from 'express-validator'
import { autenticarUsuario, usuarioAutenticado } from '../controllers/authController.js'
import auth from '../middleware/auth.js'

const authRouter = express.Router()

// Iniciar Sesion
// api/auth
authRouter.post('/', 
    autenticarUsuario
);

// Obtiene el usuario autenticado
authRouter.get('/',
    auth,
    usuarioAutenticado    
)

export default authRouter