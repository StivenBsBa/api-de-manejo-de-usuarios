import { compare, hash } from 'bcrypt';
import UserModel from '../../schemas/user.js';
import { SALT } from '../../constants/salt.js';

const updatePasswordController = async (req, res) => {
    try {
        const { id } = req;
        const { oldPassword, newPassword } = req.body;

        // Verificar si el usuario existe por ID
        const existingUserById = await UserModel.findById(id).exec();
        if (!existingUserById) {
            return res.status(401).send({ Error: ['Usuario no autorizado'] });
        }

        // Verificar si la contraseña antigua es correcta
        const checkPassword = await compare(
            oldPassword,
            existingUserById.password
        );
        if (!checkPassword) {
            return res.status(401).send({ Error: ['Contraseña incorrecta'] });
        }

        // Hashear la nueva contraseña y actualizarla
        const hashedPassword = await hash(newPassword, SALT);
        existingUserById.password = hashedPassword;

        // Guardar el usuario con la nueva contraseña
        await existingUserById.save();

        return res.send({
            Error: ['Contraseña del usuario actualizada con éxito'],
        });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res
            .status(500)
            .send({ Error: ['Error al actualizar la contraseña'] });
    }
};

export default updatePasswordController;
