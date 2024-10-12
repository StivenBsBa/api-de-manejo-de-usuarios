import connectDB from './config/db.js';
import './config/env.js';
import httpServer from './config/http.js';

const PORT = process.env.PORT || 5000; // Valor por defecto si no se encuentra en env

const bootstrap = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        httpServer.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error en la inicialización:', error);
    }
};

bootstrap();
