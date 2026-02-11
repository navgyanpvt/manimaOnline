import mongoose, { Schema, Model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    role: {
        type: String,
        default: "admin",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Check if model is already defined to prevent OverwriteModelError
const User: Model<any> = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
