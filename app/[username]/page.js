import Paymentpage from "@/components/Paymentpage";
import React from "react";
import { notFound } from "next/navigation";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

const Username = async({ params }) => {
  //if user is not present in databas show not found
  
    await connectDB()
    let user = await  User.findOne({username: params.username})
    if(!user){
      return notFound()
    }
  
  return (
    <>
      <Paymentpage username={params.username} />
    </>
  );
};

export default Username;


export async function generateMetadata({ params }) {
  return {
    title:`Support ${params.username}- Get me chai`,
  }
}
