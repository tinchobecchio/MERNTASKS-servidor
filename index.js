import express from "express";
import conectarDB from "./config/db.js";
import usersRouter from './routes/usuarios.js'
import authRouter from './routes/auth.js'
import proyectosRouter from './routes/proyectos.js'

// Crear el servidor
const app = express()

// Conectar a la base de datos
conectarDB()

// Habilitar express.json
app.use(express.json({extended: true}))

// Puerto de la APP
const PORT = process.env.PORT || 4000


// Importar rutas
app.use('/api/usuarios', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/proyectos', proyectosRouter)


app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el el puerto ${PORT}`);
})

