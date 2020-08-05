import { Schema, model, Document } from "mongoose";
import  validator from 'validator';

export interface User  extends Document{
    // _id: string;
    firstName: string;
    lastName: number;
    email: string;
    password: string;
    roles: string[];
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
    roles:[String]
}, { timestamps: true });

// UserSchema.pre('save', function(next){
//     this.$locals.password = hashPassword(this.$locals.password);
//     next();
// });


export const UserModel = model<User>('User', UserSchema);