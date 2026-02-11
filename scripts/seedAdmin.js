const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env' }); // Load env variables

// Define Schema for the script (to avoid module issues with Typescript files)
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seedAdmin() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error("MONGODB_URI is missing in .env file");
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");

        const username = "superadmin";
        const password = "manima@9668";

        // Check if user exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            console.log("Superadmin already exists.");
        } else {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create user
            await User.create({
                username,
                password: hashedPassword,
                role: "superadmin"
            });

            console.log("Superadmin created successfully.");
        }

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
}

seedAdmin();
