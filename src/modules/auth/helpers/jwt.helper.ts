
import jsonwebtoken from 'jsonwebtoken';
import { User } from '../models/users';

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;
const TOKEN_EXPIRY_PERIOD = process.env.TOKEN_EXPIRY_PERIOD as string;

export class JwtHelper {

    
    generateAccessToken(user: User) : string {
        const payload = {
            userId: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles
        };
        return jsonwebtoken.sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRY_PERIOD});
    }
}


