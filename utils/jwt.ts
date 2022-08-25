import Jwt from 'jsonwebtoken';

export default class JwtUtils {
    public static sign(payload: any, secret: any, options?: any): string {
        return Jwt.sign(payload, secret, options);
    }
    public static verify(token: string, secret: string, options?: any): any {
        return Jwt.verify(token, secret, options);
    }
    
}

export const jwt = new JwtUtils();
