import {
    idDtoschema,
    nameDtoschema,
    surnameDtoschema,
    emailDtoschema,
    passwordDtoschema,
} from '../controllers/dtoType.js';
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

const RegisterUser = Type.Object(
    {
        _id: idDtoschema,
        name: nameDtoschema,
        surname: surnameDtoschema,
        email: emailDtoschema,
        password: passwordDtoschema,
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: 'El formato del objeto no es válido',
        },
    }
);

const ajv = new Ajv({ allErrors: true })
    .addKeyword('kind')
    .addKeyword('modifier');
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addFormats(ajv, ['email', 'uuid']);
addErrors(ajv);

const validateSchema = ajv.compile(RegisterUser);

const RegisterUserDto = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    if (!isDTOValid)
        return res.status(400).send({
            errors: validateSchema.errors.map((error) => error.message),
        });
    next();
};

export default RegisterUserDto;
