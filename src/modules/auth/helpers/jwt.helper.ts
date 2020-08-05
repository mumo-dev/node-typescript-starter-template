
import jsonwebtoken from 'jsonwebtoken';
import { User } from '../models/users';

export class JwtHelper {
  
    generateAccessToken(user: User): string {

        const tokenSecret = process.env.TOKEN_SECRET as string;
        const tokenExpiryPeriod = process.env.TOKEN_EXPIRY_PERIOD as string;

        const payload = {
            userId: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles
        };
        return jsonwebtoken.sign(payload, tokenSecret, { expiresIn: tokenExpiryPeriod });
    }
}


