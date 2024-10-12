import { Router } from 'express';
import RegisterUserDto from '../dto/RegisterUserDto.js';
import RegisterUserControllers from '../controllers/RegisterUserControllers.js';
import LoginUserDto from '../dto/LoginUserDto.js';
import LoginUserController from '../controllers/LoginUserController.js';
import userJWTDTO from '../dto/user-jwt.dto.js';
import profileUserController from '../controllers/profileUserController.js';
import updateDataUserDto from '../dto/updateDataUserDto.js';
import updateDataUserController from '../controllers/updateDataUserController.js';
import updateEmailUserDto from '../dto/updateEmailUserDto.js';
import updateEmailUserController from '../controllers/updateEmailUserController.js';
import updatePasswordUserDto from '../dto/updatePasswordUserDto.js';
import updatePasswordController from '../controllers/updatePasswordController.js';
import unregisterUserDto from '../dto/unregisterUserDto.js';
import unregisterUserController from '../controllers/unregisterUserDtoController.js';
import allprofileUserController from '../controllers/allprofileUserController.js';

const userRouter = Router();

userRouter.post('/register', RegisterUserDto, RegisterUserControllers);

userRouter.post('/login', LoginUserDto, LoginUserController);

userRouter.get('/profile', userJWTDTO, profileUserController);
userRouter.get('/AllProfile', userJWTDTO, allprofileUserController);
userRouter.patch(
    '/update-data',
    userJWTDTO,
    updateDataUserDto,
    updateDataUserController
);
userRouter.patch(
    '/update-email',
    userJWTDTO,
    updateEmailUserDto,
    updateEmailUserController
);
userRouter.patch(
    '/update-password',
    userJWTDTO,
    updatePasswordUserDto,
    updatePasswordController
);
userRouter.delete(
    '/unregister',
    userJWTDTO,
    unregisterUserDto,
    unregisterUserController
);

export default userRouter;
