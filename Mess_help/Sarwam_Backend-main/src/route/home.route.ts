import { Router } from "express";
import { contactController } from "../controller/home.controller";

export class home {
    static home() {
        const router = Router();
        router.route('/contact/send').post(contactController.contact);
        router.route("/getData").get(contactController.getData);
        return router;
    }
}
