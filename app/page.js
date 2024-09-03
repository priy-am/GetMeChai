"use client"
import Body from "@/components/Body";
import { useState } from "react";

export default function Home() {
  const [visible, setVisible] = useState(false);

  const toggleBody = () => {
    setVisible(!visible);
  };

  return (
    <>
      {/* <div className="cursor-pointer" onClick={() => toggleBody()}>click here to togle the body</div> */}

      {/* {visible && <Body />} */}
      <Body/>
    </>
  );
}
