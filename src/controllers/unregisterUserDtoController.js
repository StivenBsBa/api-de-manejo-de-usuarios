import { compare } from 'bcrypt';
import UserModel from '../schemas/user.js';

const unregisterUserController = async (req, res) => {
    try {
        const { id } = req;
        const { password } = req.body;

        const existingUserById = await UserModel.findById(id).exec();
        if (!existingUserById)
            return res.status(401).send({ Error: ['Usuario no autorizado'] });

        const checkPassword = await compare(
            password,
            existingUserById.password
        );
        if (!checkPassword)
            return res
                .status(401)
                .send({ Error: ['credenciales incorrectas'] });

        await existingUserById.deleteOne();

        return res.send({ Error: ['usuario eliminado'] });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res
            .status(500)
            .send({ Error: ['Error al eliminar al usuario'] });
    }
};

export default unregisterUserController;
