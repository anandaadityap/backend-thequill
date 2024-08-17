import { RequestCategoryDto, ResponseCategoryDto } from 'src/dto/category.dto';
import { PrismaService } from 'src/prisma.service';
export declare class CategoryService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(requestCategory: RequestCategoryDto): Promise<ResponseCategoryDto>;
    update(categoryId: string, requestCategory: RequestCategoryDto): Promise<ResponseCategoryDto>;
    findAll(): Promise<ResponseCategoryDto[]>;
    delete(categoryId: string): Promise<any>;
}
