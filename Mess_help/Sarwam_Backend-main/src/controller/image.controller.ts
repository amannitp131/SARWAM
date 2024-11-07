import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary.config";
import { loadEnv } from "../config/dotenv.config";

loadEnv();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class imageController {
    static async getUrl(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            let images: string[] = [];
            if (typeof req.body.images === 'string') {
                images = [req.body.images];
            } else if (Array.isArray(req.body.images)) {
                images = req.body.images;
            } else {
                res.status(400).json({ message: "Invalid input format for images" });
                return;
            }

            const imageLinks: { url: string }[] = [];
            for (const image of images) {
                if (typeof image !== "string") {
                    res.status(400).json({ message: "Invalid image path or URL" });
                    return 
                }
                
                try {
                    const result = await cloudinary.uploader.upload(image, {
                        folder: "Images",
                    });
                    imageLinks.push({
                        url: result.secure_url,
                    });
                } catch (uploadError:any) {
                    console.log("Error while uploading the image:", uploadError.message);
                    res.status(500).json({ message: "Error uploading an image", error: uploadError });
                    return
                }
            }

            res.status(200).json({
                message: "Files uploaded successfully",
                urls: imageLinks,
            });
        } catch (err:any) {
            console.log("Error while processing the images:", err.message);
            res.status(500).json({ message: "Internal server error", error: err });
        }
    }
}
