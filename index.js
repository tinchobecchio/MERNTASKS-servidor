import express from "express";
import conectarDB from "./config/db.js";
import router from './routes/usuarios.js'

// Crear el servidor
const app = express()

// Conectar a la base de datos
conectarDB()

// Puerto de la APP
const PORT = process.env.PORT || 4000


// Importar rutas
app.use('/api/usuarios', router)



// app.get('/', (req, res) => {
//     res.send('Hola Mundo')
// });

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el el puerto ${PORT}`);
})
