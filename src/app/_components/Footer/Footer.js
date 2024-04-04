import React from "react";

const Footer = () => {
  return (
    <div className="w-full mt-[80px] bg-black text-white h-auto max-md:p-6 ">
      <div className="w-full justify-center flex gap-x-36 max-lg:gap-x-10  px-20 py-16 max-md:px-10 max-md:py-12 max-md:hidden ">
        <div className="flex flex-col gap-6">
          <div className="text-[18px] font-[600] w-[170px] h-[40px] border-b border-gray-600 flex flex-col">
            Our Software
          </div>
          <ul className="text-[16px] font-normal list-none ">
            <li>Recipedo</li>
            <li className="pt-6">Credit Calculator</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-[18px] font-[600] w-[170px] h-[40px] border-b border-gray-600 flex flex-col">
            SERVICES
          </div>
          <ul className="text-[16px] font-normal list-none ">
            <li>Recipedo Gallery</li>
            <li className="pt-6">System Status</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-[18px] font-[600] whitespace-nowrap w-[180px] h-[40px] border-b border-gray-600 flex flex-col">
            LEGAL AND SUPPORT
          </div>
          <ul className="text-[16px] font-normal list-none ">
            <li>Support</li>
            <li className="pt-6">Inclusion and diversity</li>
            <li className="pt-6">Team of use</li>
            <li className="pt-6">Privacy Policy</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-[18px] font-[600] w-[170px] h-[40px] border-b border-gray-600 flex flex-col">
            OUR COMPANY
          </div>
          <ul className="text-[16px] font-normal list-none ">
            <li>NodeDa ai</li>
            <li className="pt-6">Beta program</li>
            <li className="pt-6">Newsroom</li>
            <li className="pt-6">About NodeDa</li>
          </ul>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[700px] border-b border-gray-500">
          <div className="text-[16px] max-sm:text-[14px] font-[400] underline py-2 text-gray-500 cursor-pointer">
            Do Not Sell My Personal Information
          </div>
        </div>
      </div>
      <div className="text-[16px] max-sm:text-[14px] font-[400] text-center text-gray-500 pt-8 max-md:pt-4">
        Copyright @ 2023 NodeDa, LLC. All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
