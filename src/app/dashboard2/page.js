import DashboardHeader from "@/app/_components/DashboardHeader/DashboardHeader";
import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import { MdKey } from "react-icons/md";

const page = () => {
  return (
    <div className="">
      <DashboardHeader />
      <div className=" p-[30px] ">
        <div className="flex max-sm:flex-col">
          {/* part1 */}
          <div className=" w-[23%] h-[600px] m-[12px] bg-[#E6F2F8] rounded-[10px] max-sm:w-full max-lg:bg-white max-sm:h-auto">
            <div className=" text-[14px] text-[#49454F] font-semibold p-3 pt-6 max-lg:hidden">
              NodeDa ID Dashboard
            </div>
            <div className=" text-[12px] text-[#49454F] p-3 max-lg:hidden ">
              Personal Information
            </div>
            <Link href="/dashboard1" className=" flex max-lg:flex-col  ">
              <div className="size-6 text-black  pl-4 max-sm:pl-0">
                <FaUser />
              </div>
              <div className=" text-[12px] text-[#1D192B] pl-5 max-sm:pl-0">
                Manage ID
              </div>
            </Link>
            <div className=" mt-4  max-lg:flex-col h-[50px] w-[85%] rounded-[25px] bg-[#BFDDEE] m-3 flex items-center  max-lg:items-start  max-lg:bg-white  ">
              <div className="size-7 text-black  pl-4 max-sm:pl-0 pt-1">
                <MdKey />
              </div>

              <div className=" text-[12px] text-[#49454F] pl-2 max-lg:hidden">
                Change Password
              </div>
            </div>
          </div>
          {/* part2 */}

          <div className="m-[12px] w-[70%] ml-10 max-sm:w-full max-sm:ml-0">
            {/* box1 */}
            <div className="w-full py-1 rounded-[5px] mt-3 bg-[#BFDDEE] focus-within:bg-[#a8d6f1]">
              <div className="text-[12px] text-[#49454F] pt-2 pl-2">
                Current Password
              </div>
              <input
                type="text"
                className="w-full h-full bg-transparent border-none outline-none pl-2 text-[16px] text-[#1C1B1F]"
                placeholder="••••••••"
              />
            </div>

            {/* box2 */}
            <div className="w-full h-[40px] bg-[#BFDDEE] rounded-[5px] mt-20">
              <div className="w-full py-1 rounded-[5px] mt-3 bg-[#BFDDEE] focus-within:bg-[#a8d6f1]">
                <div className="text-[12px] text-[#49454F] pt-2 pl-2">
                  New Password
                </div>
                <input
                  type="text"
                  className="w-full h-full bg-transparent border-none outline-none pl-2 text-[16px] text-[#1C1B1F]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* box3 */}
            <div className="w-full h-[40px] bg-[#BFDDEE] rounded-[5px] mt-8">
              <div className="w-full py-1 rounded-[5px] mt-3 bg-[#BFDDEE] focus-within:bg-[#a8d6f1]">
                <div className="text-[12px] text-[#49454F] pt-2 pl-2">
                  Repeat New Password
                </div>
                <input
                  type="text"
                  className="w-full h-full bg-transparent border-none outline-none pl-2 text-[16px] text-[#1C1B1F]"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className=" text-[10px] text-[#B3261E] pt-6 pl-2">
              Passwords do not Match
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
