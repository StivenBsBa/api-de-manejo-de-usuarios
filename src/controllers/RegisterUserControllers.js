import { hash } from 'bcrypt';
import UserModel from '../schemas/user.js';
import { SALT } from '../constants/salt.js';

const RegisterUserControllers = async (req, res) => {
    try {
        const { _id, name, surname, email, password } = req.body;

        // Verifica si el ID del usuario ya existe
        const existingUserById = await UserModel.findById(_id).exec();
        if (existingUserById)
            return res
                .status(409)
                .send({
                    Error: ['Ya existe un usuario registrado con ese ID'],
                });

        // Verifica si el email ya está registrado
        const existingUserEmail = await UserModel.findOne({ email }).exec();
        if (existingUserEmail)
            return res
                .status(409)
                .send({
                    Error: ['Ya existe un usuario registrado con ese email'],
                });

        // Hashea la contraseña
        const hashedPassword = await hash(password, SALT);

        // Crea un nuevo usuario
        const user = new UserModel({
            _id,
            name,
            surname,
            email,
            password: hashedPassword,
        });

        // Guarda el usuario en la base de datos
        await user.save();

        return res
            .status(201)
            .send({ Error: ['Usuario registrado con éxito'] });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({ Error: ['Error al registrar el usuario'] });
    }
};

export default RegisterUserControllers;
