import UserModel from '../../schemas/user.js';

const profileUserController = async (req, res) => {
    try {
        const { id } = req;
        const existingUserById = await UserModel.findById(id).exec();
        if (!existingUserById)
            return res.status(401).send({ Error: ['Usuario no autorizado'] });

        const { _id, name, surname, email } = existingUserById;
        return res.send({ _id, name, surname, email });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res
            .status(500)
            .send({ Error: ['Error al al llamar a usuario'] });
    }
};

export default profileUserController;
