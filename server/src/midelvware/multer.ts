import multer from "multer";
import * as path from "path";

export const storage = {
    storage: multer.diskStorage({
        destination: path.join(process.cwd(), `/upload`),
        filename: function (req, file, callback) {
            const fileName = `${file.originalname}`

            callback(null, fileName)
        },
    })
}

