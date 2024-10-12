import { compare } from 'bcrypt';
import UserModel from '../../schemas/user.js';

const updateEmailUserController = async (req, res) => {
    try {
        const { id } = req;
        const { email, password } = req.body;

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
        existingUserById.email = email;

        await existingUserById.save();

        return res.send({ Error: ['Email del usuario actualizado'] });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res.status(500).send({ Error: ['Error al iniciar sesion'] });
    }
};

export default updateEmailUserController;
