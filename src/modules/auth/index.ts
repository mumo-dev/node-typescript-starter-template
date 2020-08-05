import { RegisterUserUseCase } from "./usecases/registerUserUseCase"
import { UserRepository } from "./repository/userRepository"
import { ValidateEmailHelper } from "./helpers/emails/validate-email.helper";
import { BcyrptPasswordHelper } from "./helpers/bcrypt.helper";
import { JwtHelper } from "./helpers/jwt.helper";
import { UserLoginUseCase } from "./usecases/userLoginUseCase";
import { AuthController } from "./authController";

const userRepository = new UserRepository();
const validateEmailHelper = new ValidateEmailHelper();
const bcryptPasswordHelper  = new BcyrptPasswordHelper();
const jwtHelper = new JwtHelper();

const registerUserUseCase = new RegisterUserUseCase(
    userRepository,   bcryptPasswordHelper,  validateEmailHelper);

const userLoginInUseCase = new UserLoginUseCase(userRepository, bcryptPasswordHelper, jwtHelper);

const authController = new AuthController(registerUserUseCase, userLoginInUseCase);

export {
    registerUserUseCase,
    userLoginInUseCase,
    authController
}