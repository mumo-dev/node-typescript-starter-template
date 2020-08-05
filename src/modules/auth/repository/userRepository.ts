import { User, UserModel } from "../models/users";


export class UserRepository {

  public async create(data: User): Promise<User | null> {
    return await UserModel.create(data);
  }


  public async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ 'email': email })
  }


}

