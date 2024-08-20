import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDb";

export const POST = async (req) => {
    try {
        await connectDB();
        let body = await req.formData();
        body = Object.fromEntries(body);

        //check if the razorpay id present on the server

        let payment = await Payment.findOne({ oid: body.razorpay_order_id });
        if (!payment) {
            return NextResponse.json({
                success: false,
                message: "Order id not found",
            });
        }

        //fetch the keyscreat of the user who is getting payment 
        let user = await User.findOne({username:payment.to_user})
        const secreat = user.razorsecret

        //verify the payment
        let isvalid = validatePaymentVerification(
            { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
            body.razorpay_signature,
            secreat
        );

        if (isvalid) {
            const updatedPayment = await Payment.findOneAndUpdate(
                { oid: body.razorpay_order_id },
                { done: true },
                { new: true }
            );
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`
            );
        } else {
            return NextResponse.json({
                success: false,
                message: "Payment verification failed",
            });
        }
    } catch (error) {
        console.error("Error processing payment:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
