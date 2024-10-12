import { compare } from 'bcrypt';
import UserModel from '../../schemas/user.js';
import { SignJWT } from 'jose';

const LoginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUserByEmail = await UserModel.findOne({ email }).exec();
        if (!existingUserByEmail)
            return res
                .status(401)
                .send({ Error: ['credenciales incorrectas'] });

        const checkPassword = await compare(
            password,
            existingUserByEmail.password
        );
        if (!checkPassword)
            return res
                .status(401)
                .send({ Error: ['credenciales incorrectas'] });
        const encoder = new TextEncoder();

        const jwtConstructor = new SignJWT({ id: existingUserByEmail._id });

        const jwt = await jwtConstructor
            .setProtectedHeader({
                alg: 'HS256',
                typ: 'JWT',
            })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

        return res.send({ jwt });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res.status(500).send({ Error: ['Error al iniciar sesion'] });
    }
};

export default LoginUserController;
