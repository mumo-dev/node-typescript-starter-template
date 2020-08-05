import bcrypt from 'bcrypt'
const saltRounds = 10;

export class BcyrptPasswordHelper {

    async hashPassword(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash
    }
    
    
     async comparePassword(plainPassword: string, hashedPassword: string): Promise<Boolean> {
        const matched =  await bcrypt.compare(plainPassword, hashedPassword);
        return matched;
    }
}