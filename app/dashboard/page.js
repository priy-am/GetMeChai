"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from "@/action/useraction";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify";

const Dashboard = () => {

  const { data: session, update } = useSession();
  const router = useRouter();
  const [form, setform] = useState({})

  useEffect(() => {
    document.title = "Dashboard - Get me chai"
    getData();
    if (!session) {
      router.push("/login");
    }
  }, [router, session])
  
  

  const getData = async()=>{
    let u = await fetchuser(session?.user.name)
    setform(u)
  }

  const handleSubmit = async(data) => {
    update()
    let a = await updateProfile(data, session?.user.name)

    toast('Profile updated', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  };

  const handlechange = (data)=>{
    setform({...form, [data.target.name]:data.target.value})
  }

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <div className="form">
        <form action={handleSubmit}>
          <div className="text-white w-2/3 mx-auto pt-10 pb-3 flex flex-col   gap-2">
            <label>Name</label>
            <input type="text" name="name" onChange={handlechange} value={form.name?form.name:""} className="rounded-lg h-9 bg-slate-700 px-5" />
            

            <label>Email</label>
            <input type="email" name="email" onChange={handlechange}  value={form.email?form.email:""} className="rounded-lg h-9 bg-slate-500 px-5"  />

            <label>Username</label>
            <input type="text" name="username" onChange={handlechange} value={form.username?form.username:""} className="rounded-lg h-9 bg-slate-700 px-5"  />
            
            <label>Profile picture </label>
            <input type="text" name="profilePic" onChange={handlechange} value={form.profilePic?form.profilePic:''} className="rounded-lg h-9 bg-slate-700 px-5"  />

            <label>Cover picture</label>
            <input type="text" name="coverPic" onChange={handlechange} value={form.coverPic?form.coverPic:""} className="rounded-lg h-9 bg-slate-700 px-5" />

            <label>RazorPay key Id</label>
            <input type="text" name="razorId" onChange={handlechange} value={form.razorId?form.razorId:''} className="rounded-lg h-9 bg-slate-700 px-5"  />
            

            <label>RazorPay key secret</label>
            <input type="text" name="razorsecret" onChange={handlechange} value={form.razorsecret?form.razorsecret:''} className="rounded-lg h-9 bg-slate-700 px-5"  />
            
          </div>

          <div className="flex justify-center items-center">
            <button type="submit" className="w-1/3 mt-6  bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 text-xl">Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;


// export const metadata = {
//     title: "Dashboard - Get me a chai",
//     description: "dashboard of  the website where you can edit your profile",
// };