const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: ".env" }); // Load env vars from .env

// Define Schemas (Simplified for seeding)
const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  details: { type: String, required: true },
});

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  services: [{
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    pricing: [{
        name: String,
        price: Number,
        features: [String],
        recommended: Boolean
    }]
  }],
});

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);
const Location = mongoose.models.Location || mongoose.model("Location", LocationSchema);

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is missing in .env.local");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");

    // Load JSON data
    const dataPath = path.join(__dirname, "../src/data/service-package.json");
    const jsonData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    const servicesData = jsonData.services;

    // Clear existing data (Optional: comment out if you want to append)
    await Service.deleteMany({});
    await Location.deleteMany({});
    console.log("Cleared existing Services and Locations");

    // 1. Create Services
    const serviceMap = new Map(); // name -> _id
    for (const s of servicesData) {
      const newService = await Service.create({
        name: s.title,
        details: s.description,
      });
      serviceMap.set(s.title, newService._id);
      console.log(`Created Service: ${s.title}`);
    }

    // 2. Process Locations & Pricing
    // Structure: Location -> services: [{ service: _id, pricing: [...] }]
    const locationMap = new Map(); // "PlaceName-State" -> { name, city, state, servicesMap: Map<ServiceId, Pricing[]> }

    for (const s of servicesData) {
      const serviceId = serviceMap.get(s.title);

      for (const place of s.places) {
        const key = `${place.placeName}-${place.state}`;
        
        if (!locationMap.has(key)) {
          locationMap.set(key, {
            name: place.placeName,
            city: place.placeName.split(" ")[0],
            state: place.state,
            servicesMap: new Map(), // ServiceId -> Pricing[]
          });
        }

        const locData = locationMap.get(key);
        
        const pricingList = place.packages.map(pkg => ({
            name: pkg.title,
            price: pkg.price,
            features: pkg.features,
            recommended: pkg.recommended || false
        }));

        locData.servicesMap.set(serviceId, pricingList);
      }
    }

    // 3. specific Locations creation
    for (const [key, data] of locationMap) {
      const servicesArray = [];
      for (const [srvId, pricing] of data.servicesMap) {
          servicesArray.push({
              service: srvId,
              pricing: pricing
          });
      }

      await Location.create({
        name: data.name,
        city: data.city,
        state: data.state,
        services: servicesArray,
      });
      console.log(`Created Location: ${data.name}`);
    }

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
