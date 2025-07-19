import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';


const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) =>({
        folder: 'produtos',
        format: file.mimetype.split('/')[1],
        transformation: [{width: 800, height: 800, crop: 'limit'}],
    })
})
export const upload = multer({ storage, limits: {fileSize: 2 * 1024 * 1024} })
