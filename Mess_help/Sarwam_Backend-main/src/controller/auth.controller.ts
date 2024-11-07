import { Request, Response, NextFunction } from "express";
import { mailSender } from "../utils/mailSender";
import User from "../model/user.model";
import bcrypt from "bcrypt";
import { Jwt } from "jsonwebtoken";
import { createToken, verifyToken } from "../utils/jwt.util";
import { ObjectId } from "mongoose";
import { generateOtp } from "../utils/otp.util";
import HomePage from "../model/home.model";
import CouponModel from "../model/coupon.model";
import LeaveModel from "../model/letter.model";
export class AuthController {
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { username, password, rememberMe } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      // const userId:ObjectId=user._id
      const expiry = rememberMe ? "30d" : "1d";
      const token = createToken(user._id.toString(), username, expiry);
      // console.log(token);
      res.status(200).json({
        message: "Login successful",
        token,
        user: { id: user._id, username: user.username },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async checkLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
      }
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id)
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          type:user.type,
          isVerified:user.isVerified,
          contractor:user.contractorName,
          hostelName:user.hostelName,
          college:user.college,
          rollNo:user.rollNo
        },
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async signUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      name,
      rollNumber,
      email,
      hostel,
      username,
      password,
      confirmPassword,
      collegeName,
      userType,
    } = req.body;
console.log(userType,'is type')
    // if (userType === 'Student') {
    //   try {
    //     const data = await HomePage.findOne({}, { totalStudentsAssociated: 1 });
    //     if (data) {
    //       data.totalStudentsAssociated += 1;
    //       await data.save();
    //     } else {
    //       console.log('No document found.');
    //     }
    //   } catch (error) {
    //     console.error('Error updating total students:', error);
    //   }
    // }
    // else if (userType=='Contractor'){
    //   try {
    //     const data = await HomePage.findOne({}, { totalContractorsAssociated: 1 });
    //     if (data) {
    //       data.totalStudentsAssociated += 1;
    //       await data.save();
    //     } else {
    //       console.log('No document found.');
    //     }
    //   } catch (error) {
    //     console.error('Error updating total students:', error);
    //   }
    // }
    

    // const profileImage = req.file;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = new User({
        name,
        rollNo:rollNumber,
        email,
        hostelName:hostel,
        username,
        password: hashedPassword,
        confirmPassword,
        collegeName,
        type:userType,
        college:collegeName
        // profileImage,
      });
      await newUser.save();
      const userId = newUser._id;
      if(userType==='Student'){
        const couponData=new CouponModel({
          studentId:userId,
          contractor:hostel,//will update with their id of contractor in future
        });
        await couponData.save();
      }
      res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
  static otpStore = {};

  static async sendOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const email = req.body.email;
      if (!email) {
        res
          .status(400)
          .json({ success: false, message: "Invalid email address." });
        return;
      }
      //will be enabled in future
      // const user = await User.findOne({ email });
      // if (!user) {
      //   res
      //     .status(404)
      //     .json({
      //       success: false,
      //       message:
      //         "No account found with this email. Please create an account.",
      //     });
      //   return;
      // }
      const otp = generateOtp();
      // console.log("otp is ; ",otp)
      const subject = "Email-Verification";
      const message = `Your OTP for Email-Verification is: ${otp}`;
      await mailSender(email, subject, message);
      (AuthController.otpStore as any)[email] = {
        otp,
        expires: Date.now() + 5 * 60 * 1000,
      };
      res
        .status(200)
        .json({ success: true, message: "OTP sent successfully!" });
    } catch (e) {
      console.error("Error sending OTP:", e);
      res
        .status(500)
        .json({
          success: false,
          message: "An error occurred while sending the OTP.",
        });
    }
  }

  static async verifyOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, otp } = req.body;
      console.log(otp, 'is ');
    
      if (!email || !otp) {
        res.status(400).json({ success: false, message: "Email and OTP are required." });
        return;
      }
    
      let otpString;
      if (Array.isArray(otp)) {
        otpString = otp.join(""); 
      } else if (typeof otp === 'number') {
        otpString = otp.toString();
      } else {
        otpString = otp; 
      }
    
      const storedData = (AuthController.otpStore as any)[email];
    
      if (!storedData) {
        res.status(404).json({ success: false, message: "No OTP found for this email." });
        return;
      }
    
      if (storedData.otp !== otpString) {
        res.status(400).json({ success: false, message: "Invalid OTP." });
        return;
      }
    
      if (Date.now() > storedData.expires) {
        delete (AuthController.otpStore as any)[email];
        res.status(400).json({ success: false, message: "OTP has expired." });
        return;
      }
    
      delete (AuthController.otpStore as any)[email];
      res.status(200).json({ success: true, message: "OTP verified successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An internal server error occurred." });
    }
    
  }

  static async updatePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, username, newPassword } = req.body;

    try {
      const user = await User.findOne({ email, username });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
      return;
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: "Server error" });
      return;
    }
  }

  static async userRoute(
    req:Request,
    res:Response,
    next:NextFunction
  ):Promise<void>{
    try {
      console.log('id is ',req.body)
      // const userId = req.body
      // const user = await User.findById(userId).select('-password');
      // if (!user) {
      //   return res.status(404).json({ message: 'User not found' });
      // }
      // res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}
