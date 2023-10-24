import React, { useContext, useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { TbMessageCircle2 } from "react-icons/tb";
import { subscribeToUserData, fetchData } from "./utils";
import { MoonLoader } from "react-spinners";
import Link from "next/link";
import {
  AiOutlineUser,
  AiOutlineStock,
  AiFillHeart,
  AiOutlinePlus,
} from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { db } from "../firebaseConfig";
import { StoreContext } from "./Store";

function Header() {
  const { data: session, status } = useSession();
  const user = session?.user?.email;
  const [info, setInfo] = useState();
  const inputRef = useRef(null);
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(StoreContext);
  const [value, setValue] = useState(state.value);
  console.log(state.value);
  useEffect(() => {
    const unsubscribe = subscribeToUserData(user, db, setInfo);
    return () => {
      unsubscribe();
    };
  }, [session, db, user, setInfo]);
  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };
  const handleOnChange = (e) => {
    setValue(e.target.value);
    dispatch({ type: "VALUE", payload: value });
  };
  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    dispatch({ type: "SET_SEARCH", payload: searchValue });
  };
  async function fetchInitialData() {
    const responseData = await fetchData("/api/data");
    if (responseData) {
      setData(responseData);
    }
  }
  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div className="stats shadow rounded-none w-[100%]  lg:w-fit sticky top-0 rounded-xl z-50 flex border bg-stone-100 ">
      <Link href="/">
        <div className="stat   hover:bg-gray-200  ">
          <div className="stat-figure text-primary justify-between items-center flex h-20  flex-col ">
            <AiOutlineStock className="inline-block w-8 h-8 stroke-current" />
            <AiOutlinePlus className="inline-block w-7 h-7 text-[#363636] rounded-full p-1 hover:bg-[#d1ccff75] hover:text-gray-500 " />
          </div>
          <div className="stat-title text-gray-700 ">Tota Stocks</div>
          <div className="stat-value text-primary">{data?.length}</div>
          <div className="stat-desc text-gray-700">
            21% more than last month
          </div>
        </div>
      </Link>

      <Link href="/favorites">
        <div className="stat  hover:bg-gray-200 ">
          <div className="stat-figure text-secondary ">
            <AiFillHeart className="inline-block w-8 h-8 stroke-current text-[#e81e1ee6]" />
          </div>
          <div className="stat-title text-gray-700">Total Favorites</div>

          {status == "loading" && (
            <MoonLoader size={30} color="#D926AA" speedMultiplier={0.5} />
          )}

          {status == "unauthenticated" ? (
            <a
              onClick={() => signIn()}
              className="badge cursor-pointer w-16 h-8"
            >
              {" "}
              Login{" "}
            </a>
          ) : (
            <div className="stat-value text-[#fabe14]">
              {info?.stock?.length}
            </div>
          )}
          <div className="stat-desc text-gray-700">5 Added yesterday</div>
        </div>
      </Link>
      <div className="stat  hover:bg-gray-200 ">
        <div className="flex justify-between items-center ">
          <div className="stat-value text-[#14a518]">86%</div>
          <TbMessageCircle2 className="inline-block w-8 h-8 text-[#40b0e0]" />
        </div>
        <div className="stat-title text-gray-700">of Stocks uncommented</div>
        <div className="stat-desc text-[#3338c7]">31 Stock Commented </div>
      </div>
      <div className="stat pr-0  hover:bg-gray-200 flex justify-between flex-col ">
        <div className="flex justify-between   ">
          <div className="w-full relative min-w-[150px]  ">
            <input
              ref={inputRef}
              type="text"
              placeholder="Serach Stocks.."
              className="input uppercase text-[#1b64a5] placeholder:normal-case text-xs md:text-base input-bordered w-full max-w-xs bg-stone-200 h-12  "
              value={state.search}
              onChange={handleSearchChange}
            />
            {state.search && (
              <div className=" absolute  top-[25%] right-[2%] hidden  md:flex">
                <MdCancel
                  onClick={() => setSearch("")}
                  className={`w-6 h-6 text-gray-700    hover:text-red-500 transition-all ease-in duration-300 `}
                />
              </div>
            )}
          </div>

          <div className="dropdown static dropdown-end ">
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
              className="mt-3 p-2 shadow menu menu-compact dropdown-content text-gray-700 bg-stone-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a href="#settings">Settings</a>
              </li>

              <li>
                <div className="">
                  <a className="flex-1"> Dark Mode </a>.
                  <label className="swap swap-rotate">
                    <input
                      type="checkbox"
                      checked={state.darkMode}
                      onChange={toggleDarkMode}
                    />

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
        <input
          type="range"
          min="1"
          max="3"
          className="range w-[95%] range-xs range-warning "
          step="1"
          value={state.value}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}

export default Header;
