const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Find more options for cloudinary:
// https://cloudinary.com/documentation/image_upload_api_reference#upload_optional_parameters

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'workout-buddy',
    allowed_formats: ['jpeg', 'jpg', 'png'],
  },
});

module.exports = storage;
