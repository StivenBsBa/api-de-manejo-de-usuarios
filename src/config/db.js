import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const connectDB = () => {
    const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;

    mongoose
        .connect(MONGODB_URI, {
            dbName: process.env.MONGO_DB,
            authSource: 'admin',
            authMechanism: process.env.DB_MECHANISM,
            serverSelectionTimeoutMS: 30000, // Aumenta el tiempo de espera (en milisegundos)
        })
        .then(() => {
            console.log('Base de Datos Conectada');
        })
        .catch((err) => {
            console.error('Error al conectar a la base de datos:', err);
            process.exit(1); // Detener la aplicación si hay un error de conexión
        });
};

export default connectDB;
