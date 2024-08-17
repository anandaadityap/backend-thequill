"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentController = void 0;
const common_1 = require("@nestjs/common");
const content_service_1 = require("./content.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const content_dto_1 = require("../dto/content.dto");
const image_service_1 = require("../image/image.service");
let ContentController = class ContentController {
    constructor(contentService, imageService) {
        this.contentService = contentService;
        this.imageService = imageService;
    }
    async createContent(body, req) {
        const content = await this.contentService.create(req.user.id, body);
        return {
            meta: {
                code: common_1.HttpStatus.CREATED,
                message: 'create content successfully',
                status: 'success',
            },
            data: content,
        };
    }
    async getAllContent(search, page = 1, limit = 5) {
        const contents = await this.contentService.findAll({ search, page, limit });
        return {
            meta: {
                code: common_1.HttpStatus.OK,
                message: 'Get all content successfully',
                status: 'success',
            },
            data: contents,
        };
    }
    async getAllContentByUser(req, search, page = 1, limit = 5) {
        const userId = req.user.id;
        const contents = await this.contentService.findAllByUser({
            userId,
            search,
            page,
            limit,
        });
        return {
            meta: {
                code: common_1.HttpStatus.OK,
                message: 'Get all content successfully',
                status: 'success',
            },
            data: contents,
        };
    }
    async getContentById(contentId) {
        const content = await this.contentService.findById(contentId);
        return {
            meta: {
                code: common_1.HttpStatus.OK,
                message: 'Get content by id successfully',
                status: 'success',
            },
            data: content,
        };
    }
    async UpdateContent(req, contentId, Body) {
        const content = await this.contentService.update(req.user.id, contentId, Body);
        return {
            meta: {
                code: common_1.HttpStatus.OK,
                message: 'Get content by id successfully',
                status: 'success',
            },
            data: content,
        };
    }
    async DeleteContent(req, contentId) {
        await this.contentService.delete(req.user.id, contentId);
        return {
            meta: {
                code: common_1.HttpStatus.OK,
                message: 'Delete content successfully',
                status: 'success',
            },
        };
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [content_dto_1.RequestContentDto, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createContent", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getAllContent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('my-content'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getAllContentByUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/:contentId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('contentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getContentById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/:contentId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('contentId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, content_dto_1.RequestContentDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "UpdateContent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':contentId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('contentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "DeleteContent", null);
exports.ContentController = ContentController = __decorate([
    (0, common_1.Controller)('api/v1/content'),
    __metadata("design:paramtypes", [content_service_1.ContentService,
        image_service_1.ImageService])
], ContentController);
//# sourceMappingURL=content.controller.js.map