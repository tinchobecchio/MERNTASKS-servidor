import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: "variables.env"});

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('DB connectada');
    } catch (error) {
        console.log(error);
        process.exit(1); // detener la app
    }
}
 
export default conectarDB;