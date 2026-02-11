const mongoose = require('mongoose');
const crypto = require('crypto');
require('dotenv').config({ path: '.env' });

const ClientSchema = new mongoose.Schema({
    name: String,
    email: String,
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
});

const Client = mongoose.models.Client || mongoose.model("Client", ClientSchema);

async function testTokenFlow() {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGODB_URI);
        
        const email = "developer.theshibaprasad@gmail.com"; // Using the email from previous debug logs if available or just one I know exists
        // Or finding ANY client
        const client = await Client.findOne({});
        if (!client) {
            console.log("No client found to test with.");
            return;
        }
        console.log("Testing with client:", client.email);

        // 1. Generate Token
        const resetToken = crypto.randomBytes(32).toString("hex");
        console.log("Generated Plain Token:", resetToken);

        // 2. Hash Token
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        console.log("Generated Hashed Token:", resetPasswordToken);

        // 3. Save to DB
        client.resetPasswordToken = resetPasswordToken;
        client.resetPasswordTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
        await client.save();
        console.log("Saved to DB.");

        // 4. Verify Immediate Retrieval via Mongoose
        const retrievedClient = await Client.findOne({ email: client.email });
        console.log("Retrieved Token from DB:", retrievedClient.resetPasswordToken);
        console.log("Match?", retrievedClient.resetPasswordToken === resetPasswordToken);

        // 5. Verify Retrieval via Query (Simulation of Reset API)
        const foundClient = await Client.findOne({
            resetPasswordToken: resetPasswordToken,
            resetPasswordTokenExpiry: { $gt: new Date() }
        });

        if (foundClient) {
            console.log("SUCCESS: Client found by hashed token.");
        } else {
            console.log("FAILURE: Client NOT found by hashed token.");
            // Debug failure
            const debugClient = await Client.findOne({ resetPasswordToken: resetPasswordToken });
            if (debugClient) {
                console.log("...but found without expiry check. Expiry:", debugClient.resetPasswordTokenExpiry);
            } else {
                console.log("...and strictly not found by token field.");
            }
        }

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
}

testTokenFlow();
