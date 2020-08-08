import { RegisterUserUseCase, EmailAlreadyExistsException } from "./usecases/registerUserUseCase";
import { UserLoginUseCase } from "./usecases/userLoginUseCase";
import { userLoginInUseCase, registerUserUseCase } from ".";
import { Controller, Post, Get } from "@overnightjs/core";
import { Request, Response, NextFunction } from "express";
import { UserModel, User } from "./models/users";
import { formatMongooseValidationErrors } from "../../common/error-formatter";
import HttpException, { ValidationException } from "../../common/http-exception";
import { CREATED, BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "http-status-codes";

@Controller("api/user/")
export class AuthController {

    private registerUserUseCase: RegisterUserUseCase;
    private userLoginUserCase: UserLoginUseCase;

    constructor(registerUserUseCase: RegisterUserUseCase, userLoginUserCase: UserLoginUseCase) {
        this.registerUserUseCase = registerUserUseCase;
        this.userLoginUserCase = userLoginInUseCase;
    }

    @Post("client/create")
    private async createClient(req: Request, res: Response, next: NextFunction) {
        try {

            const user = req.body.user;
            const error = new UserModel(user).validateSync();
            if (error) {
                const errors = formatMongooseValidationErrors(error.errors);
                return next(new ValidationException(errors));
            }

            const createdUser = await registerUserUseCase.registerClient(user);
            if (createdUser)
                return res.status(CREATED).json(JSON.parse(createdUser));
            else
                return next(new HttpException(INTERNAL_SERVER_ERROR, 'Unknown Error'));

        } catch (e) {
            if (e instanceof EmailAlreadyExistsException) {
                return next(new HttpException(BAD_REQUEST, e.message));
            }
            return next(new HttpException(INTERNAL_SERVER_ERROR, e.message));
        }
    }

    
    @Post("login")
    private async login(req: Request, res: Response, next: NextFunction) {

        try {
            const { email, password } = req.body;
            const authUser = await userLoginInUseCase.loginUser(email, password);
            return res.status(OK).json(authUser);
        } catch (e) {
            console.log(e);
            return next(new HttpException(BAD_REQUEST, 'Bad login credentials'));
        }
    }


}