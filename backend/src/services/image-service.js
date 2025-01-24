import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "../constants/constants.js";
import extractPublicId from "../utils/extractPublicId.js";
import HttpError from "../utils/HttpError.js";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const options = {
  use_filename: true,
  unique_filename: true,
  overwrite: false,
  folder: "multer-images",
};

const createFile = async (file) => {
  console.log(file);
  if (file) {
    const uploadedImage = await cloudinary.uploader.upload(file.path, options);
    return uploadedImage.secure_url;
  }
  return null;
};

const deleteFile = async (url) => {
  if (url) {
    const publicId = extractPublicId(url);
    const deletedImage = await cloudinary.uploader.destroy(publicId);
    console.log(deletedImage);
    if (deletedImage.result !== "ok") {
      throw new HttpError("Could not delete image", 404);
    }
    return deletedImage;
  }
  return null;
};

const updateFile = async (url, file) => {
  if (file) {
    await deleteFile(url);
    const updatedImageUrl = await createFile(file);
    return updatedImageUrl;
  }
  return url;
};

export default { updateFile, deleteFile, createFile };
