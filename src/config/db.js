import mongoose from 'mongoose';

const connectDB = (url) =>
    mongoose
        .connect(url, { dbName: process.env.MONGO_DB })
        .then(() => console.log('Base de datos conectada'))
        .catch((err) => {
            console.error('Error conectando a la base de datos:', err);
            process.exit(1); // Sale del proceso si hay error en la conexión
        });

export default connectDB;
