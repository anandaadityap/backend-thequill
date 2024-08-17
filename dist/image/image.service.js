"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const streamifier = require("streamifier");
let ImageService = class ImageService {
    async uploadImages(files) {
        const uploadPromises = files.map((file) => this.uploadImageArticle(file));
        return Promise.all(uploadPromises);
    }
    async uploadImageArticle(file) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({ upload_preset: process.env.CLOUDINARY_PRESET_ARTICLE }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }
    async uploadImageBanner(file) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({ upload_preset: process.env.CLOUDINARY_PRESET_BANNER }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }
};
exports.ImageService = ImageService;
exports.ImageService = ImageService = __decorate([
    (0, common_1.Injectable)()
], ImageService);
//# sourceMappingURL=image.service.js.map