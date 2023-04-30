import React from "react";
import { useEffect, useState, useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { TfiSearch } from "react-icons/tfi";
import { CgMenu } from "react-icons/cg";
import { MdCancel } from "react-icons/md";
import { signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { searchValueAtom } from "../atoms/searchValueAtom";
import { selectedAtom } from "../atoms/selectedAtom";
import Link from "next/link";
function navbar({ session, scrollHeight }) {
  const menuItems = ["All Stocks", "Favorites", "Settings"];
  const [search, setSearch] = useRecoilState(searchValueAtom);
  const [selected, setSelected] = useRecoilState(selectedAtom);

  return (
    <div
      className={`navbar  shadow-md   ${
        scrollHeight > 200 ? "sticky" : "hidden"
      }  backdrop-blur-lg z-50 transition-all ease-in-out  duration-700 inset-0 text-gray-700 bg-stone-100`}
    >
      <div className="navbar-start ">
        <div className="dropdown md:hidden  ">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <CgMenu className="w-6 h-6  " />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content text-gray-700 mt-3 p-2 shadow bg-stone-100 rounded-box w-52"
          >
            {menuItems.map((item, i) => (
              <li
                onClick={() => setSelected(i)}
                className={` ${selected == i && "text-blue-500"}  normal-case`}
              >
                <div className="">
                  {/* <Link href="/favorites"> */}
                  <a className="flex-1"> {item}</a>
                  <a href=""></a>
                  {/* </Link> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-center hidden md:inline-block  ">
        {menuItems.map((item, i) => (
          <a
            onClick={() => setSelected(i)}
            className={` ${
              selected == i && "text-blue-500"
            } btn btn-ghost normal-case`}
          >
            {item}
          </a>
        ))}
      </div>

      <div className="navbar-end md:space-x-2">
        <div className="indicator hidden md:inline-block">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder={
              selected == 0 ? "Search Stocks..." : "Search Favorites..."
            }
            className="input text-xs  max-w-[24rem] border-gray-400 border-[0.6px] rounded-full border-opacity-100 h-8 bg-stone-100 min-w-[10rem] "
          />
          {search.length == 0 ? (
            <TfiSearch className="w-5 h-5 top-1/2 right-4   indicator-item     " />
          ) : (
            <MdCancel
              onClick={() => setSearch("")}
              className={`w-6 h-6 text-blue-500 indicator-item  top-1/2 right-4   hover:text-red-500 transition-all ease-in duration-300 `}
            />
          )}
        </div>
        <div className=" md:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <TfiSearch className="w-5 h-5  " />
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-stone-100 rounded-box w-52"
          >
            <li>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search Stocks..."
                className="input  max-w-[24rem] bg-stone-100 min-w-[10rem] "
              />
            </li>
          </ul>
        </div>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            {session?.user?.image ? (
              <div className="w-7 flex rounded-full">
                <img src={session?.user.image} />
              </div>
            ) : (
              <AiOutlineUser className="w-6 h-6  " />
            )}
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-stone-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a href="#settings">Settings</a>
            </li>
            <li>
              <div className="">
                <a className="flex-1">Grid </a>
                <a href="">2</a>
              </div>
            </li>

            <li>
              <div className="">
                <a className="flex-1"> Dark Mode </a>.
                <label className="swap swap-rotate">
                  <input type="checkbox" />

                  <svg
                    className="swap-on fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  <svg
                    className="swap-off fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </div>
            </li>
            <li>
              <a onClick={() => (session ? signOut() : signIn())}>
                {session ? `Logout` : "Login"}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default navbar;
