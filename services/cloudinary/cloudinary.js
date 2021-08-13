const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const UPLOAD_IMAGE_PRESET = 'OnlineAcademy_Image';
const UPLOAD_VIDEO_PRESET = 'OnlineAcademy_Video';

const getPublicId = (url) => {
  const str = url.split('/');
  const folder = str[7];
  const fileName = str[8].slice(0, str[8].lastIndexOf('.'));
  const id = `${folder}/${fileName}`;
  return id;
};

const uploadImage = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, { resource_type: "image", upload_preset: UPLOAD_IMAGE_PRESET});
    return uploadResponse;
  } catch (error) {
    console.log(error);
  }
};

const uploadVideo = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, { resource_type: "video" , upload_preset: UPLOAD_VIDEO_PRESET});
    return uploadResponse;
  } catch (error) {
    console.log(error);
  }
};

const removeImage = async (url) => {
  try {
    const publicId = getPublicId(url);
    const res = await cloudinary.uploader.destroy(publicId, {resource_type: "image"});
    if (res.result === 'ok') return true;
    return false;
  } catch (error) {
    console.log(error);
  }
};

const removeVideo = async (url) => {
  try {
    const publicId = getPublicId(url);
    const res = await cloudinary.uploader.destroy(publicId, {resource_type: "video"});
    if (res.result === 'ok') return true;
    return false;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadImage,
  uploadVideo,
  removeImage,
  removeVideo
}