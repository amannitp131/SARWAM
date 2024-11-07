import { Request, Response, NextFunction } from "express";
import Payment from "../model/payment.model";
import PaymentModel from "../model/payment.model";
export class StudentController {
  static async getPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const details = await Payment.find(
        { user: id },
        { items: 1, totalAmount: 1, createdAt: 1 }
      );
      if (!details.length) {
        res.status(404).json({ message: "Payments not found" });
        return;
      }
      res.status(200).json(details);
    } catch (error) {
      next(error);
    }
  }
  static async savePayment(
    req:Request,
    res:Response,
    next:NextFunction
  ):Promise<void>{
    try {
        const { items, totalAmount } = req.body;
        const userId = req.params.id;
        console.log('adafa')
        const newPayment = new PaymentModel({
            user: userId,
            items,
            totalAmount,
        });

        await newPayment.save();
        res.status(201).json({ message: 'Payment saved successfully', payment: newPayment });
    } catch (error) {
        next(error);
    }
  }
}
