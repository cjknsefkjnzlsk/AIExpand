import React from "react";
import Socials from "../Socials";
import Link from "next/link";
import Button from "../Button";

const Footer = ({ onContactClick }) => {
  return (
    <>
      <div className="mt-5 laptop:mt-40 p-2 laptop:p-0">
        <div>
          <h1 className="text-4xl text-bold text-purple-200">Contact</h1>
          <div className="">
            <h1 className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl text-bold capitalize my-8">
              Let&apos;s Work Together
            </h1>
            <Button type="primary" onClick={onContactClick}>Schedule a call</Button>
            <div className="mt-10">
              <Socials />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
