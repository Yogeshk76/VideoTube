import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, publicId = null) => {
  try {
    if (!localFilePath) return "No file path provided";

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      overwrite: true,
    })

    if(publicId) {
      options.public_id = publicId;
    }

    fs.unlinkSync(localFilePath); // Delete the local file after upload
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); 
    return null;
  }
}


export { uploadOnCloudinary };