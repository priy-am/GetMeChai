import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWapper from "@/components/SessionWapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get Me A Chai - Found your projects with chai",
  description: "This website is a crowdfunding platform for creaters",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWapper>
          <Navbar />
          <div className="min-h-[85vh] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">
            {children}
          </div>
          <Footer />
        </SessionWapper>
      </body>
    </html>
  );
}
