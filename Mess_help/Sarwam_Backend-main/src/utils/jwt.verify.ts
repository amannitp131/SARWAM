import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { loadEnv } from "../config/dotenv.config";

loadEnv();
interface User {
    id: string;
    name: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: User; 
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string) as User;
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

export default verifyToken;
