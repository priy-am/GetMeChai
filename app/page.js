import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-3 justify-center text-center items-center text-white pt-4  min-h-[44vh]">
        <div className="font-bold text-3xl ">Buy me a chai</div>
        <p className="text-sm">A crowdfunding platform  for creaters. Get funded by your fans and followers. Start Now!</p>
        <div className="flex sm:flex-row flex-col gap-3">
          <Link href={`/login`} type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</Link>

          <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </div>
      </div>
      <div className="bg-white  h-[3px] opacity-25"></div>
      <div className="text-white flex flex-col py-20 gap-5 items-center justify-center ">
        <h2 className="text-3xl font-bold mb-9 text-center">Your fan can buy a chai</h2>
        <div className="flex gap-5 px-1 w-full items-center justify-around">
          <div className="item flex flex-col gap-2 justify-center items-center">
            <img className="rounded-full bg-center bg-slate-500 mix-blend-hard-light" src="/man.avif" width={"88"} alt="man" />
            <p className="font-bold text-center">found yourself</p>
            <p className=" text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item flex flex-col gap-2 justify-center items-center">
            <img className="rounded-full bg-center bg-slate-500 mix-blend-hard-light" src="/coin.gif" width={"88"} alt="coin" />
            <p className="font-bold text-center">found yourself</p>
            <p className=" text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item flex flex-col gap-2 justify-center items-center">
            <img className="rounded-full bg-center bg-slate-500 mix-blend-hard-light" src="/group.gif" width={"88"} alt="group" />
            <p className="font-bold text-center">Fans want to help</p>
            <p className=" text-center">Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      {/* <div className="bg-white h-[3px] opacity-25"></div>

      <div className="text-white flex flex-col py-20 gap-5 items-center justify-center ">
        <h2 className="text-3xl font-bold mb-9 text-center">Learn more about us</h2>
        
      </div> */}
    </>
  );
}
