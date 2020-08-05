import { UserRepository } from "../repository/userRepository";
import { User } from "../models/users";
import { Roles } from "../models/role.enum"
import { ValidateEmailHelper } from "../helpers/emails/validate-email.helper";
import validator from "validator";
import { BcyrptPasswordHelper } from "../helpers/bcrypt.helper";



export class RegisterUserUseCase {
    
    private userRepository: UserRepository;
    private bcryptPasswordHelper: BcyrptPasswordHelper;
    private validateEmailHelper: ValidateEmailHelper;

    constructor(userRepository: UserRepository, bcryptPasswordHelper: BcyrptPasswordHelper,
        validateEmailHelper: ValidateEmailHelper) {
        this.userRepository = userRepository;
        this.bcryptPasswordHelper = bcryptPasswordHelper;
        this.validateEmailHelper = validateEmailHelper;
    }

    async registerClient(userRequest: User): Promise<User| null> {
       
       //check that email does not exist
       const existingUser = await this.userRepository.findByEmail(userRequest.email);
       if(existingUser) {
           throw new EmailAlreadyExistsException(`Email ${userRequest.email} already exists`);
       }
    
        const clientRole = Roles.CLIENT;
        userRequest.roles = [ clientRole ];
        const hashedPassword = await this.bcryptPasswordHelper.hashPassword(userRequest.password);
        userRequest.password = hashedPassword;
        const user =  await this.userRepository.create(userRequest);
        if(user != null) {
           this.validateEmailHelper.sendUserValidationEmail(user);
        }
        return user;

    }
}

export class EmailAlreadyExistsException extends Error {
    constructor(message: string) {
        super(message)
    }
}