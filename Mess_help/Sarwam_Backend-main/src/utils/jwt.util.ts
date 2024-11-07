import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { loadEnv } from "../config/dotenv.config";
import { ObjectId } from 'mongoose';
interface DecodedToken extends JwtPayload {
    id: ObjectId;
}
loadEnv();

export const createToken = (userId: string, userName: string, expiresIn: string) => {
    const payload = {
        id: userId,
        name: userName,
    };

    const options = {
        expiresIn,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, options);
    return token;
};

export const verifyToken = (token: string): DecodedToken => {
    if (!token) {
        throw new Error("Token is required");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        return decoded;
    } catch (err) {
        throw new Error("Invalid Token");
    }
};
