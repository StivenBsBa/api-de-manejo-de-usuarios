import { Type } from '@sinclair/typebox';
export const idDtoschema = Type.String({
    format: 'uuid',
    errorMessage: {
        type: 'el tipo _id no es valido',
        format: 'el formato _id no es valido, debe ser un uuid',
    },
});
export const nameDtoschema = Type.String({
    minLength: 2,
    maxLength: 20,
    errorMessage: {
        minLength: 'el nombre debe tener al menos 2 caracteres',
        maxLength: 'el nombre debe terer maximo 20 caracteres',
    },
});
export const surnameDtoschema = Type.String({
    minLength: 4,
    maxLength: 50,
    errorMessage: {
        minLength: 'el apellido debe tener al menos 4 caracteres',
        maxLength: 'el apellido debe terer maximo 50 caracteres',
    },
});
export const emailDtoschema = Type.String({
    format: 'email',
    errorMessage: {
        Type: 'el tipo email no es valido, debe ser un string',
        format: 'el formato email no es valido, debe ser un email valido con el formato correcto',
    },
});
export const passwordDtoschema = Type.String({
    format: 'password',
    minLength: 10,
    maxLength: 25,
    errorMessage: {
        type: 'El tipo de la password no es válido, debe ser un string',
        format: 'El formato de la password, debe contener una mayúscula, una minúcula y un número',
        minLength: 'password debe tener al menos 10 caracteres de longitud',
        maxLength: 'password debe tener como máximo 25 caracteres de longitud',
    },
});
