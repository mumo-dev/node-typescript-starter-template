import { UserRepository } from "../repository/userRepository";
import { BcyrptPasswordHelper } from "../helpers/bcrypt.helper";
import { JwtHelper } from "../helpers/jwt.helper";
import { request } from "express";


export class UserLoginUseCase {

    private userRepository: UserRepository;
    private bcryptPasswordHelper: BcyrptPasswordHelper;
    private jwtHelper: JwtHelper;

    constructor(userRepository: UserRepository,
        bcryptPasswordHelper: BcyrptPasswordHelper,
        jwtHelper: JwtHelper) {
        this.userRepository = userRepository;
        this.bcryptPasswordHelper = bcryptPasswordHelper;
        this.jwtHelper = jwtHelper;
    }

    async loginUser(email: string, password: string): Promise<AuthenticatedUser> {
        // fetch user by email from db
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new UserNotFoundException(`User with email ${email}  Not Found`);
        }
        // check if password match
        const matched = this.bcryptPasswordHelper.comparePassword(password, user.password);
        if (!matched) {
            throw new PasswordDoesNotMatchException()
        }

        // generate token and return user in json format
        const token =  this.jwtHelper.generateAccessToken(user);
        const authUser = { 
            token, 
            userId: user._id, 
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        } as AuthenticatedUser;

        return authUser;
    }
}


export class UserNotFoundException extends Error {

    constructor(message: string) {
        super(message)
    }
}

export class PasswordDoesNotMatchException extends Error {
    constructor() {
        super()
    }
}

export interface AuthenticatedUser {
    userId: string;
    firstName: string;
    lastName: number;
    email: string;
    token: string;
    roles: string[];
}