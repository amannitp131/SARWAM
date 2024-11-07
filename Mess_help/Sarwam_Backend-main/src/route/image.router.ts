import { Router } from "express";
import { imageController } from "../controller/image.controller";
export class image{
   static getImageUrl(){
    const router=Router();
    router.route('/get_url').get(imageController.getUrl);
    return router;
   }
}