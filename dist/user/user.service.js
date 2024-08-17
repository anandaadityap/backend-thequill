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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createUser(registerRequest) {
        const usernameExists = await this.findByUsername(registerRequest.username);
        if (usernameExists)
            throw new common_1.HttpException('username already exists', 409);
        const emailExists = await this.findByEmail(registerRequest.email);
        if (emailExists)
            throw new common_1.HttpException('email already exists', 409);
        const newUser = await this.prismaService.user.create({
            data: {
                ...registerRequest,
                password: await bcrypt.hash(registerRequest.password, 10),
            },
        });
        const { id, password, ...result } = newUser;
        return result;
    }
    async findByEmail(email) {
        return await this.prismaService.user.findUnique({
            where: { email },
        });
    }
    async findByUsername(username) {
        const user = await this.prismaService.user.findUnique({
            where: { username },
        });
        return user;
    }
    async editUser(userId, editUserRequest) {
        const updatedUser = await this.prismaService.user.update({
            where: { id: userId },
            data: {
                ...editUserRequest,
            },
        });
        const { password, refresh_token, ...result } = updatedUser;
        return result;
    }
    async findById(id) {
        return this.prismaService.user.findUnique({ where: { id } });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map