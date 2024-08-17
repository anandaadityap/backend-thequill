import { CloudinaryResponse } from './cloudinary.response';
export declare class ImageService {
    uploadImages(files: Express.Multer.File[]): Promise<CloudinaryResponse[]>;
    uploadImageArticle(file: Express.Multer.File): Promise<CloudinaryResponse>;
    uploadImageBanner(file: Express.Multer.File): Promise<CloudinaryResponse>;
}
