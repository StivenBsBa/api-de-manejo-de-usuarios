import UserModel from '../../schemas/user.js';

const updateDataUserController = async (req, res) => {
    try {
        const { id } = req;
        const { name, surname } = req.body;

        const existingUserById = await UserModel.findById(id).exec();
        if (!existingUserById)
            return res.status(401).send({ Error: ['Usuario no autorizado'] });

        existingUserById.name = name;
        existingUserById.surname = surname;

        await existingUserById.save();

        return res.send({ Error: ['Usuario actualizado'] });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res.status(500).send({ Error: ['Error al iniciar sesion'] });
    }
};

export default updateDataUserController;
