import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Divider, Image } from "antd";
import { SlUser } from "react-icons/sl";

export default function ProfileSidebar() {
  const { user, loading, isLogout } = useSelector((state) => state.auth);

  useEffect((

  ) => {}, []);

  return (
    <div className="bg-zinc-100 sticky top-0 w-[20rem] p-6">
      {loading ? null : (
        <div className="flex-1 items-center gap-4 rounded-lg">
          <div className="flex-1 flex-col">
            <div className="flex flex-col items-center flex-shrink-0 gap-3">
              <Image
                src={user?.avatar?.url}
                alt="SariSariCart Logo"
                className="h-22 w-22 rounded-full"
                width={175}
              />

              <div className="flex flex-col items-center">
                <span className="font-extrabold text-normal tracking-normal text-xl">
                  <span className="text-[#1E4BCA]">
                    {user.name}
                  </span>
                </span>
                <span className="text-normal">{user.email}</span>
              </div>
            </div>

            <Divider />

            <div className="space-y-4">
              <div className="hover:bg-[#1E4BCA] hover:text-white py-2 px-3 rounded cursor-pointer w-full flex flex-1 flex-row justify-between items-center">
                <div className="flex items-center gap-4">
                  <SlUser color="#0f172a" size={20} />

                  <span className="">Profile</span>
                </div>
              </div>
{/* 
              <div className="hover:bg-[#1E4BCA] hover:text-white py-2 px-3 rounded cursor-pointer w-full flex flex-1 flex-row justify-between items-center">
                <div className="flex items-center gap-4">
                  <LiaTruckLoadingSolid color="#0f172a" size={20} />

                  <span className="">My Orders</span>
                </div>
              </div> */}
            </div>

            {/* <Divider /> */}
          </div>
        </div>
      )}
    </div>
  );
}