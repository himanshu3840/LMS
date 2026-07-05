import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (filePath) => {

    

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log(cloudinary.config());

    try {

        if (!filePath) {
            return null;
        }

        console.log("Uploading file:", filePath);

        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"// isse wo video bhi accept karlega
        });

        console.log("Upload Success:", uploadResult);

        fs.unlinkSync(filePath);

        return uploadResult.secure_url;

    } catch (error) {

        

        console.log("Cloudinary Error:");
        console.log(error);
        console.log("Message:", error.message);
        console.log("HTTP Code:", error.http_code);

        return null;
    }
};

export default uploadOnCloudinary;