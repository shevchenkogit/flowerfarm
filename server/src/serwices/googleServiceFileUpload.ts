import { Plants } from "../models/plantsModel";
import { ReturnerModel } from "../models/returnerModel";
import * as fs from "fs";
import { google } from "googleapis";
import * as path from "path";
import { v4 } from "uuid";
import {configs} from "../configs/configs";

class GoogleServiceFileUpload {
  public async UploadFullImage(file) {
    async function uploadFile() {
      try {
        const GOOGLE_API_FOLDER_ID = configs.GOOGLE_API_FOLDER_ID;
        const uuidv4 = v4();
        const auth = new google.auth.GoogleAuth({
          keyFile: `${configs.BUCKET_GOOGLE_SERVICE_FILE}`,
          scopes: ["https://www.googleapis.com/auth/drive"],
        });
        // @ts-ignore
        const driveService = await google.drive({
          version: "v3",
          auth,
        });
        const fileMetaData = {
          name: `${uuidv4}.jpg`,
          parents: [GOOGLE_API_FOLDER_ID],
        };
        const media = {
          mimeType: "image/jpg",
          body: await fs.createReadStream(path.join(process.cwd(), `/upload/${file.originalname}`)),
        };
        const response: any = await driveService.files.create({
          // @ts-ignore
          resource: fileMetaData,
          media: media,
          field: "id",
        });

        await ReturnerModel.create({
          image: `https://drive.google.com/uc?export=view&id=${response.data.id}`,
        });
        return response.data.id;
      } catch (err) {
        console.log("Upload file error", err);
      }

    }
    await uploadFile()
    await fs.unlinkSync(path.join(process.cwd(), `/upload/${file.originalname}`))
  }

  public async UploadCropedImage(file) {

    async function uploadFile() {
      try {
        const GOOGLE_API_FOLDER_ID = configs.GOOGLE_API_FOLDER_ID;
        const uuidv4 = v4();
        const auth = new google.auth.GoogleAuth({
          keyFile: `${configs.BUCKET_GOOGLE_SERVICE_FILE}`,
          scopes: ["https://www.googleapis.com/auth/drive"],
        });
        // @ts-ignore
        const driveService = await google.drive({
          version: "v3",
          auth,
        });
        const fileMetaData = {
          name: `${uuidv4}.jpg`,
          parents: [GOOGLE_API_FOLDER_ID],
        };
        const media = {
          mimeType: "image/jpg",
          body: await fs.createReadStream(
              path.join(process.cwd(), `/upload/${file.originalname}`)
          ),
        };
        const response: any = await driveService.files.create({
          // @ts-ignore
          resource: fileMetaData,
          media: media,
          field: "id",
        });

        const returner = await ReturnerModel.find();

        await Plants.create({
          ...returner[0].value,
          fullImage: returner[1].image,
          cropImage: `https://drive.google.com/uc?export=view&id=${response.data.id}`,
        });

        return await response.data.id;
      } catch (err) {
        console.log("Upload file error", err);
      }
    }

    await uploadFile()
    await fs.unlinkSync(path.join(process.cwd(), `/upload/${file.originalname}`))
  }

  public async deleteFile(file) {
    const fileArr = await JSON.parse(file)
    const fullImage = fileArr.fullImage.split(",")[1]
    const cropImage = fileArr.cropImage.split(",")[1]

    async function deleteFileR(full:string, crop:string) {
      try{
      const auth = new google.auth.GoogleAuth({
        keyFile: `${configs.BUCKET_GOOGLE_SERVICE_FILE}`,
        scopes: ["https://www.googleapis.com/auth/drive"],
      });
      // @ts-ignore
      const driveService = await google.drive({
        version: "v3",
        auth,
      });
        await driveService.files.delete({
          fileId: `${full}`,
        });

        await driveService.files.delete({
          fileId: `${crop}`,
        });

      }catch (e){
        console.log(e)
      }

    }
    await deleteFileR(fullImage, cropImage);
  }
}

export const googleServiceFileUpload = new GoogleServiceFileUpload();
