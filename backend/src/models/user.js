import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if(value.length==0) throw new Error('usernnames cannot be empty');
        }
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if(value.length==0) throw new Error('usernnames cannot be empty');
        }
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true,
        immutable: true,
        validate(value) {
            if(!validator.isEmail(value)) throw new Error('invalid email');
        }
    },
    password: { 
        type: String,
        trim: true,
        required: true,
        immutable: true,
        validate(value) {
            if(value.length<=6) throw new Error('length of password must be greater than 6');
        }  
    },
    role: {
        type: String,
        enum: ['creator', 'student'],
        required: true,
    },
    token: {
        type: String,
        default: '',
    }
});

userSchema.methods.generateToken = function(){
    const token = jwt.sign({_id: this._id.toString()}, 'lifesucks');
    this.token = token;
    this.save();
}

const User = new mongoose.model('User', userSchema);

export default User;