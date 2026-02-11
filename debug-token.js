const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const ClientSchema = new mongoose.Schema({
    name: String,
    email: String,
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
});

const Client = mongoose.models.Client || mongoose.model("Client", ClientSchema);

async function checkClients() {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGODB_URI);
        
        // Find the user (assuming the one I just tested with, or list all with tokens)
        const clients = await Client.find({ resetPasswordToken: { $exists: true, $ne: null } });
        
        console.log(`Found ${clients.length} clients with tokens:`);
        clients.forEach(c => {
            console.log(`- Email: ${c.email}`);
            console.log(`  Token (Hash): ${c.resetPasswordToken}`);
            console.log(`  Expiry: ${c.resetPasswordTokenExpiry}`);
            console.log(`  Current Time: ${new Date()}`);
            console.log(`  Is Expired?: ${new Date() > c.resetPasswordTokenExpiry}`);
        });

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
}

checkClients();
