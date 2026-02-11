import mongoose, { Schema, Model, Document } from "mongoose";

export interface IAgent extends Document {
    name: string;
    email: string;
    password?: string;
    phone: string;
    location: mongoose.Types.ObjectId;
    createdAt: Date;
}

const AgentSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide an agent name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        // In a real app, we would hash this in a pre-save hook or controller. 
        // For now, the API route will handle hashing or we'll store it as is if no hashing lib is available yet?
        // Wait, package.json has bcryptjs. We will hash in the API route.
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone number"],
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        required: [true, "Please assign a location"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Agent: Model<IAgent> = mongoose.models.Agent || mongoose.model<IAgent>("Agent", AgentSchema);

export default Agent;
