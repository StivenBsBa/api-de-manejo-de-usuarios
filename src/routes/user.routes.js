import { Router } from 'express';
import RegisterUserDto from '../dto/usersDto/RegisterUserDto.js';
import RegisterUserControllers from '../controllers/UserControllers/RegisterUserControllers.js';
import LoginUserDto from '../dto/usersDto/LoginUserDto.js';
import LoginUserController from '../controllers/UserControllers/LoginUserController.js';
import userJWTDTO from '../dto/usersDto/user-jwt.dto.js';
import profileUserController from '../controllers/UserControllers/profileUserController.js';
import updateDataUserDto from '../dto/usersDto/updateDataUserDto.js';
import updateDataUserController from '../controllers/UserControllers/updateDataUserController.js';
import updateEmailUserDto from '../dto/usersDto/updateEmailUserDto.js';
import updateEmailUserController from '../controllers/UserControllers/updateEmailUserController.js';
import updatePasswordUserDto from '../dto/usersDto/updatePasswordUserDto.js';
import updatePasswordController from '../controllers/UserControllers/updatePasswordController.js';
import unregisterUserDto from '../dto/usersDto/unregisterUserDto.js';
import unregisterUserController from '../controllers/UserControllers/unregisterUserDtoController.js';
import allprofileUserController from '../controllers/UserControllers/allprofileUserController.js';

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
