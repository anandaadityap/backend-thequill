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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma.service");
let ContentService = class ContentService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(userId, body) {
        const content = await this.prismaService.content.create({
            data: {
                ...body,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return content;
    }
    async findAll({ search, page, limit }) {
        const skip = (page - 1) * limit;
        const where = search
            ? {
                OR: [
                    { title: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                    {
                        article: { contains: search, mode: client_1.Prisma.QueryMode.insensitive },
                    },
                ],
            }
            : {};
        const data = await this.prismaService.content.findMany({
            where,
            skip: skip,
            take: limit,
            include: {
                user: true,
            },
            orderBy: {
                created_at: 'desc',
            },
        });
        const totalItems = await this.prismaService.content.count({ where });
        return {
            contents: data,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        };
    }
    async findAllByUser({ userId, search, page, limit }) {
        const skip = (page - 1) * limit;
        const where = search
            ? {
                user_id: userId,
                OR: [
                    { title: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                    {
                        article: { contains: search, mode: client_1.Prisma.QueryMode.insensitive },
                    },
                ],
            }
            : { user_id: userId };
        const data = await this.prismaService.content.findMany({
            where,
            skip: skip,
            take: limit,
            include: {
                user: true,
            },
            orderBy: {
                created_at: 'desc',
            },
        });
        const totalItems = await this.prismaService.content.count({ where });
        return {
            contents: data,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        };
    }
    async findById(contentId) {
        return this.prismaService.content.findFirst({
            where: { id: contentId },
            include: { user: true },
        });
    }
    async update(userId, contentId, body) {
        const contentExist = await this.prismaService.content.findUnique({
            where: { id: contentId },
        });
        if (!contentExist)
            throw new common_1.HttpException('content not found', common_1.HttpStatus.NOT_FOUND);
        if (contentExist.user_id !== userId)
            throw new common_1.HttpException('this content is not yours', common_1.HttpStatus.FORBIDDEN);
        return this.prismaService.content.update({
            where: { id: contentId },
            data: { ...body },
        });
    }
    async delete(userId, contentId) {
        const contentExist = await this.prismaService.content.findUnique({
            where: { id: contentId },
        });
        if (!contentExist)
            throw new common_1.HttpException('content not found', common_1.HttpStatus.NOT_FOUND);
        if (contentExist.user_id !== userId)
            throw new common_1.HttpException('this content is not yours', common_1.HttpStatus.FORBIDDEN);
        return this.prismaService.content.delete({
            where: { id: contentId },
        });
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentService);
//# sourceMappingURL=content.service.js.map