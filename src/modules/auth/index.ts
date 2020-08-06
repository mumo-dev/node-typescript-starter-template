import { RegisterUserUseCase } from "./usecases/registerUserUseCase"
import { UserRepository } from "./repository/userRepository"
import { EmailSenderHelper } from "./helpers/emails/email.helper";
import { BcyrptPasswordHelper } from "./helpers/bcrypt.helper";
import { JwtHelper } from "./helpers/jwt.helper";
import { UserLoginUseCase } from "./usecases/userLoginUseCase";
import { AuthController } from "./authController";
import { EmailService } from "../../common/email/emailService";

const userRepository = new UserRepository();
const emailService = new EmailService();
const emailHelper = new EmailSenderHelper(emailService);
const bcryptPasswordHelper  = new BcyrptPasswordHelper();
const jwtHelper = new JwtHelper();

const registerUserUseCase = new RegisterUserUseCase(
    userRepository,   bcryptPasswordHelper,  emailHelper);

const userLoginInUseCase = new UserLoginUseCase(userRepository, bcryptPasswordHelper, jwtHelper);

const authController = new AuthController(registerUserUseCase, userLoginInUseCase);

export {
    registerUserUseCase,
    userLoginInUseCase,
    authController
}