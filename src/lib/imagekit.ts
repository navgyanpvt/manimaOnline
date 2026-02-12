import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.publicKey || process.env.NEXT_PUBLIC_PUBLIC_KEY || "",
    privateKey: process.env.privateKey || process.env.PRIVATE_KEY || "",
    urlEndpoint: process.env.urlEndpoint || process.env.URL_ENDPOINT || "",
});

export default imagekit;
