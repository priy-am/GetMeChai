"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [dropdownshow, setdropdownshow] = useState(false)

  return (
    <nav className="bg-gray-900 md:h-20 h-28 items-center text-white flex md:flex-row flex-col  md:justify-between justify-center">
      <Link href='/' className="logo pl-7 font-bold text-xl">GetMeChai</Link>
      {/* <ul className='flex justify-end pr-5 gap-5'>
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>Sign up</li>
        <li>Login</li>
      </ul> */}

      <div className="flex pt-2 relative">
        {session ? (
          <>
            <button onClick={() => { setdropdownshow(!dropdownshow) }} onBlur={() => {
              setTimeout(() => {
                setdropdownshow(false)
              }, 150);
            }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800  inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700  bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" type="button">wellcome {session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {/* <!-- Dropdown menu --> */}
            <div id="dropdown" className={`z-10 ${dropdownshow ? "" : "hidden"} absolute top-14 left-24 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>

                <li>
                  <Link href={`/`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</Link>
                </li>

                <li>
                  <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                </li>

                <li>
                  <Link href="#" onClick={() => { signOut() }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                </li>
              </ul>
            </div>

            <button
              onClick={() => signOut()}
              className="sm:block hidden text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Sign out
            </button>
          </>
        ) : (
          <Link href={"/login"}>
            <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
