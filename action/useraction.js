"use server"
import Razorpay from 'razorpay'
import Payment from '@/models/Payment'
import User from '@/models/User'
import connectDB from '@/db/connectDb'
import { NextResponse } from 'next/server'


export const initiate = async(amount, to_username, paymentform)=>{
    await connectDB()

    
        //fetch the keyscreat of the user who is getting payment 
        let user = await User.findOne({username: to_username})
        const secreat = user.razorsecret

    let instance = new Razorpay({ key_id: user.razorId, key_secret: secreat })

    let option = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }
    let ord = await instance.orders.create(option)

    //create a payment object which shows a pending payment in database

    await Payment.create({
        oid: ord.id,
        amount: amount,
        to_user: to_username,
        name: paymentform.name,
        message:paymentform.message,
    })
    
    return ord
}

export const fetchuser = async(username)=>{
    await connectDB();
    let u = await User.findOne({username:username})
    if(u==null){
        return {
            success: false,
            message: "This User is not exit",
        };
    }
    let user = u.toObject({flattenObjectIds:true})
    return user

}

export const fetchPayment = async(username)=>{
    await connectDB();
    //find all paymnet sorted by decreasing order of amount and flatten object
    let p = await Payment.find({to_user:username, done:true}).sort({amount: -1}).limit(15).lean()
    return p
}

export const updateProfile = async(data, oldusername)=>{
    await connectDB();
    let ndata = Object.fromEntries(data)
    //if user name is being update
    if(oldusername !== ndata.username){
        let user = await User.find({username:ndata.username})
        if(user){
            return {error:"User allready exits"}
        }
    }
    await User.updateOne({email:ndata.email}, ndata)
}