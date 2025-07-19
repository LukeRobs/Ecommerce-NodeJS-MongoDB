import { upload }from '../config/multer.js'
import multer from 'multer';

const formatosPermitidos = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
];

export const validaUpload = [
    upload.array('file', 5),
    (req, res, next) => {
        const maxSize = 2 * 1024 * 1024
        if(!req.files || req.files === 0) {
            return res.status(400).json({message: "Envie pelo menos um arquivo"})
        }
        for(const file of req.files) {
            if (!formatosPermitidos.includes(file.mimetype)) {
                return res.status(400).json({message: `Formato invalido: ${file.originalname}. Envie somente: jpeg, jpg, png, webp.`})
            }
        }
    next()
    }
];
