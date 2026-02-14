import ImageKit from "imagekit";

const imagekitConfig = {
    publicKey: process.env.publicKey || process.env.NEXT_PUBLIC_PUBLIC_KEY || "",
    privateKey: process.env.privateKey || process.env.PRIVATE_KEY || "",
    urlEndpoint: process.env.urlEndpoint || process.env.URL_ENDPOINT || "",
};

// Initialize only if keys are present to prevent crash
const imagekit = imagekitConfig.publicKey ? new ImageKit(imagekitConfig) : null;

export default imagekit;
