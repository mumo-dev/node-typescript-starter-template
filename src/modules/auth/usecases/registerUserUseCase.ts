import { UserRepository } from "../repository/userRepository";
import { User } from "../models/users";
import { Roles } from "../models/role.enum"
import { EmailSenderHelper } from "../helpers/emails/email.helper";
import validator from "validator";
import { BcyrptPasswordHelper } from "../helpers/bcrypt.helper";
import * as crypto from 'crypto'


export class RegisterUserUseCase {

    private userRepository: UserRepository;
    private bcryptPasswordHelper: BcyrptPasswordHelper;
    private validateEmailHelper: EmailSenderHelper;

    constructor(userRepository: UserRepository, bcryptPasswordHelper: BcyrptPasswordHelper,
        validateEmailHelper: EmailSenderHelper) {
        this.userRepository = userRepository;
        this.bcryptPasswordHelper = bcryptPasswordHelper;
        this.validateEmailHelper = validateEmailHelper;
    }

    async registerClient(userRequest: User): Promise<string | undefined> {

        //check that email does not exist
        const existingUser = await this.userRepository.findByEmail(userRequest.email);
        if (existingUser) {
            throw new EmailAlreadyExistsException(`Email ${userRequest.email} already exists`);
        }

        const clientRole = Roles.CLIENT;
        userRequest.roles = [clientRole];
        const hashedPassword = await this.bcryptPasswordHelper.hashPassword(userRequest.password);
        userRequest.password = hashedPassword;
        userRequest.accountActivationCode = this.generateAccountActivationCode();
        // set activate code expiry date to 30 mins from  now
        const now = new Date()
        const activationCodeExpiryDate = new Date(now.getTime() + 30 * 60000)
        userRequest.activationCodeExpiryDate = activationCodeExpiryDate;
        const user = await this.userRepository.create(userRequest);
        if (user) {
            this.validateEmailHelper.sendAccountActivationEmail(user);
        }
        return user?.toJSONAuth();
    }


    private generateAccountActivationCode(): string {
        return crypto.randomBytes(20).toString('hex');
    }
}

export class EmailAlreadyExistsException extends Error {
    constructor(message: string) {
        super(message)
    }
}