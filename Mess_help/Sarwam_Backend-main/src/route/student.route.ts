import { Router } from "express";
import { StudentController } from "../controller/student.controller";

export class StudentRouter {
    static student() {
        const router = Router();
        router.route('/getPayment/:id').get(StudentController.getPayment);
        router.post('/savePrice/:id', StudentController.savePayment);
        return router;
    }
}
