import UserModel from '../schemas/user.js';

const allprofileUserController = async (req, res) => {
    try {
        // Obtener todos los usuarios
        const existingUserAll = await UserModel.find().exec();

        // Mapear los resultados para extraer solo los campos necesarios
        const users = existingUserAll.map((user) => {
            const { _id, name, surname, email } = user;
            return { _id, name, surname, email };
        });

        // Enviar la lista de usuarios como respuesta
        return res.send(users);
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res
            .status(500)
            .send({ Error: ['Error al obtener todos los usuarios'] });
    }
};

export default allprofileUserController;
