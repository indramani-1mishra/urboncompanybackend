import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: 'dq0fg6qkj',
  api_key: '142946185644114',
  api_secret: 'PGzaUvkhJnKZ9t_yGEvLO_JEK0s'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'urbancompany_clone',
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

export const upload = multer({ storage: storage });
