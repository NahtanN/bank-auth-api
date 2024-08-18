export interface FileServiceInterface {
  uploadFile(file: Express.Multer.File): Promise<string>;
}
