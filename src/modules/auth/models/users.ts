import { Schema, model, Document } from "mongoose";
import validator from 'validator';

export interface User extends Document {
    // _id: string;
    firstName: string;
    lastName: number;
    email: string;
    password: string;
    accountActivated: boolean;
    accountActivationCode: string,
    activationCodeExpiryDate: Date
    roles: string[];
    toJSONAuth(): string;
}

const UserSchema = new Schema<User>({
    firstName: {
        type: String,
        required: [true, 'First Name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required']
    },
   
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Email is required'],
        validate: {
            validator: validator.isEmail, message: 'Email is invalid'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    roles: [String],

    accountActivated: {
        type: Boolean,
        default: false
    },
    accountActivationCode: String,
    activationCodeExpiryDate: Date

}, { timestamps: true });


UserSchema.methods.toJSONAuth = function(): string {
    const user = {
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        authorities: this.roles
    };

    return JSON.stringify(user);
}
// UserSchema.pre('save', function(next){
//     this.$locals.password = hashPassword(this.$locals.password);
//     next();
// });


export const UserModel = model<User>('User', UserSchema);