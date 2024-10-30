import React from "react";
import { Avatar, Button, Divider } from "antd";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { TbCategory2 } from "react-icons/tb";
import { HiOutlinePresentationChartBar } from "react-icons/hi2";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { FaRegStar } from "react-icons/fa";
import { PiUsersThree } from "react-icons/pi";

export default function Sidebar() {
  return (
    <div className="min-h-screen w-full min-w-[20rem] p-8 bg-white sticky top-0">
      <div className="flex items-center gap-4  rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center flex-shrink-0 gap-3">
            <img
              src="/images/sarisaricart_logo.jpg"
              alt="SariSariCart Logo"
              className="h-14 w-14"
            />

            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-normal">
                <span className="text-[#1E4BCA]">SariSariCart</span>
              </span>
              <span className="text-xs">Your Doorstep Delights Delivered</span>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="hover:bg-[#1E4BCA]hover:text-white py-2 px-3 rounded cursor-pointer w-full flex flex-1 flex-row justify-between items-center">
              <div className="flex items-center gap-4">
                <HiOutlinePresentationChartBar color="#0f172a" size={20} />

                <span className="">Dashboard</span>
              </div>
            </div>

            <Divider orientation="left" plain>
              Product Management
            </Divider>

            <a className="hover:bg-[#1E4BCA] hover:text-white py-2 px-3 rounded cursor-pointer w-full flex flex-1 flex-row justify-between items-center" href="/products">
              <div className="flex items-center gap-4">
                <BsBoxSeam color="#0f172a" size={20} />

                <span className="">Products</span>
              </div>
            </a>

            <a className="hover:bg-[#1E4BCA] hover:text-white py-2 px-3 rounded cursor-pointer w-full flex flex-1 flex-row justify-between items-center" href="/categories">
              <div className="flex items-center gap-4">
                <TbCategory2 color="#0f172a" size={20} />

                <span className="">Categories</span>
              </div>
            </a>

            <div className="hover:bg-[#1E4BCA] hover:text-white py-2 px-3 rounded cursor-pointer w-full flex flex-1 flex-row justify-between items-center">
              <div className="flex items-center gap-4">
                <LiaTruckLoadingSolid color="#0f172a" size={20} />

                <span className="">Orders</span>
              </div>
            </div>

            <div className="hover:bg-[#1E4BCA] hover:text-white py-2 px-3 rounded cursor-pointer w-full flex flex-1 flex-row justify-between items-center">
              <div className="flex items-center gap-4">
                <FaRegStar color="#0f172a" size={20} />

                <span className="">Product Reviews</span>
              </div>
            </div>

            <Divider orientation="left" plain>
              User Management
            </Divider>

            <div className="hover:bg-[#1E4BCA] hover:text-white py-2 px-3 rounded cursor-pointer w-full flex flex-1 flex-row justify-between items-center">
              <div className="flex items-center gap-4">
                <PiUsersThree color="#0f172a" size={20} />

                <span className="">Users</span>
              </div>
            </div>
          </div>

          {/* <Divider /> */}
        </div>
      </div>
    </div>
  );
}