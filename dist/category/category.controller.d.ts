import { CategoryService } from './category.service';
import { RequestCategoryDto, ResponseCategoryDto } from 'src/dto/category.dto';
import { WebResponse } from 'src/dto/web.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    CreateCategory(body: RequestCategoryDto): Promise<WebResponse<ResponseCategoryDto>>;
    updateCategory(categoryId: string, body: RequestCategoryDto): Promise<WebResponse<ResponseCategoryDto>>;
    getAllCategory(): Promise<WebResponse<ResponseCategoryDto[]>>;
    deleteCategory(categoryId: string): Promise<WebResponse<any>>;
}
