import mongoose from 'mongoose';
import {PasswordService} from "../services/PasswordService";

//Interface for User Properties
interface UserAttrs {
    email: string,
    password: string
}

//Interface for properties of user class/model
interface UserModel extends mongoose.Model<UserDocument> {
    build(attrs: UserAttrs): UserDocument;
}

//Interface that describes User Document properties
interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done)  {
     if(this.isModified('password')) {
        const hashed = await PasswordService.toHash(this.get('password'));
        this.set('password', hashed);
     }
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export {User}