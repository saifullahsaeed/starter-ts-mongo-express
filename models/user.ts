import mongoose from 'mongoose';
import { hashSync, compareSync } from 'bcryptjs';
import passportLocalMongoose from 'passport-local-mongoose';


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    token: {
        type: String,
    },
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    this.password = hashSync(this.password, 10);
    next();
} );

userSchema.methods.comparePassword = function(password: string) {
    return compareSync(password, this.password);
}

userSchema.methods.findOne = function(email: string) {
    return this.model('User').findOne({ email: email });
}
userSchema.methods.delete = function(email: string) {
    return this.model('User').deleteOne({ email: email });
}

userSchema.methods.findOneAndUpdate = function(email: string, password: string) {
    return this.model('User').findOneAndUpdate({ email: email }, { password: password });
}

userSchema.plugin(passportLocalMongoose);
export default mongoose.model('User', userSchema);