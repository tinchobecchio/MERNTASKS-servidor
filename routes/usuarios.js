import express from 'express';
import { crearUsuario } from '../controllers/usuarioController.js'
import { check } from 'express-validator';

const usersRouter = express.Router()

// Crea un usuario
// api/usuarios
usersRouter.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
    ],
    crearUsuario
);

export default usersRouter