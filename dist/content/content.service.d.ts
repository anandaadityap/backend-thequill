import { RequestContentDto, ResponseContentDto } from 'src/dto/content.dto';
import { PrismaService } from 'src/prisma.service';
interface FindAllArgs {
    search?: string;
    page: number;
    limit: number;
}
interface FindAllByUserArgs {
    userId: string;
    search?: string;
    page: number;
    limit: number;
}
export declare class ContentService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(userId: string, body: RequestContentDto): Promise<ResponseContentDto>;
    findAll({ search, page, limit }: FindAllArgs): Promise<{
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
    }>;
    findAllByUser({ userId, search, page, limit }: FindAllByUserArgs): Promise<{
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
    }>;
    findById(contentId: string): Promise<ResponseContentDto>;
    update(userId: string, contentId: string, body: RequestContentDto): Promise<ResponseContentDto>;
    delete(userId: string, contentId: string): Promise<any>;
}
export {};
