import { HttpStatus } from '@nestjs/common';
import { ContentService } from './content.service';
import { RequestContentDto, ResponseContentDto } from 'src/dto/content.dto';
import { WebResponse } from 'src/dto/web.dto';
import { ImageService } from 'src/image/image.service';
export declare class ContentController {
    private readonly contentService;
    private imageService;
    constructor(contentService: ContentService, imageService: ImageService);
    createContent(body: RequestContentDto, req: any): Promise<WebResponse<ResponseContentDto>>;
    getAllContent(search?: string, page?: number, limit?: number): Promise<{
        meta: {
            code: HttpStatus;
            message: string;
            status: string;
        };
        data: {
            contents: ({
                user: {
                    id: string;
                    username: string;
                    email: string;
                    password: string;
                    role: import(".prisma/client").$Enums.Role;
                    biodata: string | null;
                    avatar_url: string | null;
                    refresh_token: string | null;
                    created_at: Date;
                    updated_at: Date;
                    deleted_at: Date | null;
                };
            } & {
                id: string;
                title: string;
                subject: string;
                article: string;
                image_banner: string | null;
                user_id: string;
                recomendation: boolean;
                created_at: Date;
                updated_at: Date;
            })[];
            totalItems: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
    getAllContentByUser(req: any, search?: string, page?: number, limit?: number): Promise<{
        meta: {
            code: HttpStatus;
            message: string;
            status: string;
        };
        data: {
            contents: ({
                user: {
                    id: string;
                    username: string;
                    email: string;
                    password: string;
                    role: import(".prisma/client").$Enums.Role;
                    biodata: string | null;
                    avatar_url: string | null;
                    refresh_token: string | null;
                    created_at: Date;
                    updated_at: Date;
                    deleted_at: Date | null;
                };
            } & {
                id: string;
                title: string;
                subject: string;
                article: string;
                image_banner: string | null;
                user_id: string;
                recomendation: boolean;
                created_at: Date;
                updated_at: Date;
            })[];
            totalItems: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
    getContentById(contentId: string): Promise<WebResponse<ResponseContentDto>>;
    UpdateContent(req: any, contentId: string, Body: RequestContentDto): Promise<WebResponse<ResponseContentDto>>;
    DeleteContent(req: any, contentId: string): Promise<WebResponse<any>>;
}
