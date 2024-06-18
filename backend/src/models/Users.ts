import mongoose, {Document,Schema,Model} from "mongoose";

export interface IUser extends Document {
    username : string;
    email : string;
    password : string;
    date?: Date;
}

const UserSchema : Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

export const User : Model<IUser> = mongoose.model("users", UserSchema)