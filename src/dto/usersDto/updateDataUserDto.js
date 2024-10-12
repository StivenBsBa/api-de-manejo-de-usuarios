import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import {
    nameDtoschema,
    surnameDtoschema,
} from '../../controllers/UserControllers/dtoType.js';

const updateDataUser = Type.Object(
    {
        name: nameDtoschema,
        surname: surnameDtoschema,
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: 'El formato del objeto no es válido',
        },
    }
);

const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

const validateSchema = ajv.compile(updateDataUser);

const updateDataUserDto = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    if (!isDTOValid)
        return res.status(400).send({
            errors: validateSchema.errors.map((error) => error.message),
        });
    next();
};

export default updateDataUserDto;
