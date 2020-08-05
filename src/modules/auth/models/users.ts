import { Schema, model, Document } from "mongoose";
import validator from 'validator';

export interface User extends Document {
    // _id: string;
    firstName: string;
    lastName: number;
    email: string;
    password: string;
    activated: boolean;
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
    activated: {
        type: Boolean,
        default: false
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
    roles: [String]
}, { timestamps: true });


UserSchema.methods.toJSONAuth = function(): string {
    const user = {
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
    };

    return JSON.stringify(user);
}
// UserSchema.pre('save', function(next){
//     this.$locals.password = hashPassword(this.$locals.password);
//     next();
// });


export const UserModel = model<User>('User', UserSchema);