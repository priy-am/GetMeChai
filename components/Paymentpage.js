"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchPayment, fetchuser, initiate } from "@/action/useraction";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Bounce } from "react-toastify";

const Paymentpage = ({ username }) => {
  const { data: session } = useSession();
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData();
  }, [username]);

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast("Payment has been done.. Thanks for Donation", {
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
    }
    router.push(`/${username}`);
  }, []);

  const handelChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async (params) => {
    try {
      let u = await fetchuser(username);
      setCurrentUser(u);

      let dbpayment = await fetchPayment(username);
      setPayments(dbpayment);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const pay = async (amount) => {
    //get order id
    let order = await initiate(amount, username, paymentform);
    let order_id = order.id;
    let options = {
      key: currentUser?.razorId, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "GetMeChai", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: paymentform.name, //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

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
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="image w-full py-6 relative">
        <img
          className="object-cover w-full  m-auto h-[350px]"
          src={currentUser.coverPic ? currentUser.coverPic : "/banner.jpeg"}
          alt=""
        />

        <div className="profile h-36 w-36 md:h-48 md:w-48 absolute top-64 border-2 border-white rounded-full p-[2px] left-[35%] sm:left-[45%] ">
          <img
            className=" rounded-full -z-10 h-36 w-36 md:h-48 md:w-48"
            src={currentUser.profilePic ? currentUser.profilePic : "/avtar.gif"}
            alt=""
          />
        </div>
      </div>
      <div className="info flex flex-col items-center gap-2 justify-center mt-16 mb-8">
        <div className="font-bold">@{username}</div>
        <div className="text-slate-400 text-center">
          Lets helps {username} to get a chai!
        </div>
        <div className="text-slate-400 text-center">
          {payments.length} Payments . ₹
          {payments.reduce((a, b) => a + b.amount / 100, 0)} has raised
        </div>
      </div>

      <div className="payment flex md:flex-row flex-col-reverse items-center gap-3 mx-2 md:mx-28 pb-10">
        <div className="supporter md:w-1/2 w-full md:mx-0 mx-20 bg-slate-900 px-9 pb-5 rounded-xl overflow-y-auto  max-h-[25rem] ">
          {/* show List of supporter as a leaderboard */}
          <h2 className="font-bold text-3xl text-center my-4 mb-6 font-mono">
            Top 15 Suppoter
          </h2>
          <ul>
            {payments.length == 0 && <li>No payment yet</li>}
            {payments?.map((user) => {
              return (
                <li
                  key={user?._id}
                  className="my-4 ml-4 text-lg flex gap-3  items-center"
                >
                  <div className="w-14 h-12 flex justify-center items-center">
                    <img
                      src="/avtar.gif"
                      className="rounded-full h-10"
                      alt="userAvtar"
                    />
                  </div>
                  <span className="text-sm">
                    {user.name}{" "}
                    <span className="font-bold">{`₹${
                      user?.amount / 100
                    }`}</span>{" "}
                    with a meassage "
                    <span className="font-mono"> {user.message} </span> "
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="make-payment md:w-1/2 w-full md:mx-0 mx-20  bg-slate-900 px-9 pb-5 rounded-xl ">
          <h2 className="font-bold text-2xl my-5">Make a payment</h2>
          <div className="flex flex-col justify-center items-center gap-3">
            <input
              onChange={handelChange}
              name="name"
              value={paymentform.name}
              type="text"
              placeholder="Enter Name"
              className="w-full rounded-lg p-3 bg-slate-800 "
            />
            <input
              onChange={handelChange}
              name="message"
              value={paymentform.message}
              type="text"
              placeholder="Enter Message"
              className="w-full rounded-lg p-3 bg-slate-800 "
            />
            <input
              onChange={handelChange}
              name="amount"
              value={paymentform.amount}
              type="text"
              placeholder="Enter Amount"
              className="w-full rounded-lg p-3 bg-slate-800 "
            />
            <button
              disabled={paymentform.name.length <= 3 || paymentform.amount <= 1}
              onClick={() => {
                pay(parseInt(paymentform.amount) * 100);
              }}
              className={`w-56 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 text-xl  ${
                (paymentform.name.length <= 3 || paymentform.amount <= 1) &&
                "opacity-50 cursor-not-allowed"
              } `}
            >
              Pay
            </button>
          </div>
          {/* or chose from these amount */}
          <div className="flex gap-3 mt-5">
            <button
              disabled={paymentform.name.length <= 3}
              className={`rounded-lg bg-slate-800 p-3 hover:bg-slate-600 ${
                paymentform.name.length <= 3 && "opacity-50 cursor-not-allowed"
              } `}
              onClick={() => pay(1000)}
            >
              Pay ₹10
            </button>
            <button
              disabled={paymentform.name.length <= 3}
              className={`rounded-lg bg-slate-800 p-3 hover:bg-slate-600 ${
                paymentform.name.length <= 3 && "opacity-50 cursor-not-allowed"
              } `}
              onClick={() => pay(2000)}
            >
              Pay ₹20
            </button>
            <button
              disabled={paymentform.name.length <= 3}
              className={`rounded-lg bg-slate-800 p-3 hover:bg-slate-600 ${
                paymentform.name.length <= 3 && "opacity-50 cursor-not-allowed"
              } `}
              onClick={() => pay(3000)}
            >
              Pay ₹30
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Paymentpage;
