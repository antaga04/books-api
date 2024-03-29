const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolios',
    allowFormats: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
  },
});

const uploadFile = multer({ storage });

module.exports = uploadFile;
