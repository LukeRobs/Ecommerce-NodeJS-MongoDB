import multer from 'multer'
import path from 'path'
import fs from 'fs'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const baseDir = path.join('src', 'uploads');
        const ext = path.extname(file.originalname).toLowerCase()
        let subFolder = ''

        if(ext === '.png') {
            subFolder = 'pngFiles'
        }
        else if(ext === '.jpg') {
            subFolder = 'jpgFiles'
        }
        else {
           return res.status(400).json({message: "arquivo invalido, envie .png ou .jpg"})
        }

        const uploadDir = path.join(baseDir, subFolder);
        fs.mkdirSync(uploadDir, {recursive: true});
        cb(null, uploadDir)
    },

    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + file.originalname
            cb(null, filename)
    }
});

export const upload = multer({ storage })
