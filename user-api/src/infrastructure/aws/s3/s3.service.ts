import "dotenv/config";
import { FileServiceInterface } from "@domain/files/service/file.service.interface";
import * as AWS from "aws-sdk";
import { randomUUID } from "crypto";

export class S3Service implements FileServiceInterface {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `${randomUUID()}-${file.originalname}`;
    const { originalname, buffer } = file;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: originalname,
      Body: buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    const { Location } = await this.s3.upload(params).promise();

    return Location;
  }
}
