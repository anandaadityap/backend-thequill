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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, prismaService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.prismaService = prismaService;
    }
    async register(registerRequest) {
        const newUser = this.userService.createUser(registerRequest);
        return newUser;
    }
    async login(loginRequest) {
        const user = await this.validateUser(loginRequest);
        const payload = {
            id: user.id,
            name: user.username,
            email: user.email,
            role: user.role,
            avatar: user.avatar_url,
        };
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '60m',
            secret: process.env.JWT_SECRET_KEY,
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '30d',
            secret: process.env.JWT_REFRESH_TOKEN,
        });
        await this.prismaService.user.update({
            where: { id: user.id },
            data: {
                refresh_token: refreshToken,
            },
        });
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async validateUser(loginRequest) {
        const user = await this.userService.findByEmail(loginRequest.email);
        if (user && (0, bcrypt_1.compare)(loginRequest.password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        throw new common_1.UnauthorizedException();
    }
    async refreshToken(refreshToken) {
        if (!refreshToken)
            throw new common_1.HttpException('UNAUTHORIZED', common_1.HttpStatus.UNAUTHORIZED);
        const user = await this.prismaService.user.findFirst({
            where: { refresh_token: refreshToken },
        });
        if (!user)
            throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_TOKEN,
            });
            const newPayload = {
                id: payload.id,
                name: payload.name,
                email: payload.email,
                role: payload.role,
                avatar: payload.avatar,
            };
            const accessToken = await this.jwtService.signAsync(newPayload, {
                secret: process.env.JWT_SECRET_KEY,
                expiresIn: '60m',
            });
            return accessToken;
        }
        catch (error) {
            throw new common_1.HttpException('UNAUTHORIZED', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async logout(refreshToken) {
        if (!refreshToken)
            throw new common_1.HttpException('FORBIDDEN', common_1.HttpStatus.FORBIDDEN);
        const user = await this.prismaService.user.findFirst({
            where: { refresh_token: refreshToken },
        });
        if (!user)
            throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
        return await this.prismaService.user.update({
            where: { id: user.id },
            data: { refresh_token: null },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map