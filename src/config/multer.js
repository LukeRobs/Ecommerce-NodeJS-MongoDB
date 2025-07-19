import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';
import path from 'path';
import fs from 'fs';


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'produtos',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{width: 800, height: 800, crop: 'limit'}]
    }
});

export const upload = multer({ storage })
