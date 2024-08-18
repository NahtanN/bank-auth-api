import { S3Service } from "@infrastructure/aws/s3/s3.service";
import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import AppException from "@shared/exceptions.shared";

@Module({
  imports: [
    MulterModule.register({
      fileFilter: (req, file, callback) => {
        // Allow only image files
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(
            AppException.badRequest("Apenas imagens são aceitas."),
            false,
          );
        }
        callback(null, true);
      },
    }),
  ],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module { }
