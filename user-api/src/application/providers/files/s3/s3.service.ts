import { S3Service } from "@infrastructure/aws/s3/s3.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppS3Service extends S3Service {
  constructor() {
    super();
  }
}
