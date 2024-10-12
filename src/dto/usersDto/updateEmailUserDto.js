import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import {
    emailDtoschema,
    passwordDtoschema,
} from '../../controllers/UserControllers/dtoType.js';

const updateEmailUser = Type.Object(
    {
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

const ajv = new Ajv({ allErrors: true });

ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);

addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifer');
addErrors(ajv);

const validateSchema = ajv.compile(updateEmailUser);

const updateEmailUserDto = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    if (!isDTOValid)
        return res.status(400).send({
            errors: validateSchema.errors.map((error) => error.message),
        });
    next();
};

export default updateEmailUserDto;
