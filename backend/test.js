import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function test() {
    try {
        const result = await cloudinary.uploader.upload("public/Himanshu.jpg");
        console.log(result);
    } catch (err) {
        console.log("ERROR OBJECT:");
        console.dir(err, { depth: null });

        console.log("\nOwn properties:");
        console.log(Object.getOwnPropertyNames(err));

        console.log("\nFull stack:");
        console.log(err.stack);
    }
}

test();