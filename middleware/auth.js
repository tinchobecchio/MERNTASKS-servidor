import jwt  from 'jsonwebtoken'

const auth = async (req,res,next) => {
    
    // Leer el token del header
    const token = req.header('x-auth-token')

    // Revisar si no hay token
    if(!token) {
        return res.status(401).json({msg: 'No hay token, permiso no válido'})
    }

    // Validar el token

    try {
        const cifrado = jwt.verify(token, process.env.SECRETA)
        console.log(cifrado);
        req.usuario = cifrado.usuario
        next()
    } catch (error) {
        res.status(401).json({msg: 'Token no válido'})
    }
}
 
export default auth