import cron from 'node-cron';
import CouponModel from '../model/coupon.model';

export async function resetDailyCoupons() {
    try {
        const coupons = await CouponModel.find();

        for (const coupon of coupons) {
            coupon.monthlySpent += coupon.todaysSpent;
            coupon.yearlySpent += coupon.todaysSpent;
            coupon.todaysSpent = 0;
            await coupon.save();
        }
    } catch (error) {
        console.error("Error resetting daily coupons: ", error);
    }
}
cron.schedule('0 0 * * *', resetDailyCoupons);
