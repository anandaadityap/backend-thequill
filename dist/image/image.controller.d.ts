import { ImageService } from './image.service';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    uploadImages(files: Express.Multer.File[]): Promise<import("./cloudinary.response").CloudinaryResponse[]>;
    uploadImageArticle(file: Express.Multer.File): Promise<import("./cloudinary.response").CloudinaryResponse>;
    uploadImageBanner(file: Express.Multer.File): Promise<import("./cloudinary.response").CloudinaryResponse>;
}
