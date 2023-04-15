import express from 'express';
import { crearUsuario } from '../controllers/usuarioController.js'

const router = express.Router()

// Crea un usuario
// api/usuarios
router.post('/', (req,res) => {
    crearUsuario(req,res)
});

export default router