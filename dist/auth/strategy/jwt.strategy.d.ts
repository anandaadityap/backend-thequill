import { Strategy } from 'passport-jwt';
import { PayloadJwtDto } from 'src/dto/auth.dto';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: PayloadJwtDto): Promise<{
        id: string;
        name: string;
        email: string;
        role: string;
    }>;
}
export {};
