import { Router } from "express";
import { AuthController } from "../controller/auth.controller"; 
import multer from 'multer'
export class auth {
  static auth() {
    const router = Router();
    router.route("/login").post(AuthController.login);
    router.route("/checklogin").get(AuthController.checkLogin);
    router.route("/sendOtp").post(AuthController.sendOtp);
    router.route("/verifyOtp").post(AuthController.verifyOtp);
    router.route("/updatePassword").post(AuthController.updatePassword);
    router.route("/user").get(AuthController.userRoute)
    const storage = multer.memoryStorage(); 
    const upload = multer({ storage });

    router
      .route("/signup")
      .post(upload.single("profileImage"), AuthController.signUp);
    
    return router;
  }
}
