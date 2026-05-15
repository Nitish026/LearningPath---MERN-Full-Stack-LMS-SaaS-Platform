import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadMedia = async (file, folder = 'profile-images') => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'auto',
    });

    return uploadResponse;
  } catch (error) {
    console.log('Cloudinary Upload Error:', error);
    throw error;
  }
};

export const deleteMedia = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });
  } catch (error) {
    console.log('Cloudinary Delete Error:', error);
    throw error;
  }
};

export const deleteVideo = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'video',
    });
  } catch (error) {
    console.log('Cloudinary Video Delete Error:', error);
    throw error;
  }
};

export default cloudinary;
