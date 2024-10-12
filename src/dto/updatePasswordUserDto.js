import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors'; // Asegúrate de importar ajv-errors

import { passwordDtoschema } from '../controllers/dtoType.js';

// Definición del esquema
const updatePasswordUser = Type.Object(
    {
        oldPassword: passwordDtoschema,
        newPassword: passwordDtoschema,
    },
    {
        additionalProperties: false,
        errorMessage: 'el formato del objeto no es válido',
    }
);

// Configuración de AJV
const ajv = new Ajv({ allErrors: true });
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);

// Agregar formatos y palabras clave
addFormats(ajv, ['email', 'uuid']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv); // Asegúrate de agregar ajv-errors

// Compilación del esquema
const validateSchema = ajv.compile(updatePasswordUser);

// Middleware para validar DTO
const updatePasswordUserDto = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    if (!isDTOValid) {
        return res.status(400).send({
            errorMessage: {
                additionalProperties: 'El formato del objeto no es válido',
            },
        });
    }

    next();
};

export default updatePasswordUserDto;
