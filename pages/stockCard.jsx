import React from "react";
import { db } from "../firebaseConfig";
import { useState, useRef } from "react";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { AiFillStar } from "react-icons/ai";
import { BsFillEraserFill } from "react-icons/bs";
import { TbChartDots3 } from "react-icons/tb";
import { TiChartLine } from "react-icons/ti";

import TradingViewWidget from "./tradingViewChart";
import toast, { Toaster } from "react-hot-toast";
function stockCard({ x, i, frame, list, user, comments, width }) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [filterColors, setFilterColors] = useState("");
  const [toggole, setToggole] = useState(false);
  const [toggoleBetweenFinToTradingView, setToggoleBetweenFinToTradingView] =
    useState(true);
  const tradingViewURL = `https://www.tradingview.com/chart/?symbol=${x}`;
  const finvizStockUrl = `https://charts2-node.finviz.com/chart.ashx?cs=l&t=${x}&tf=${
    frame ? "d" : "w"
  }&s=linear&ct=candle_stick${
    toggole
      ? "&o[0][ot]=sma&o[0][op]=50&o[0][oc]=FF8F33C6&o[1][ot]=sma&o[1][op]=200&o[1][oc]=DCB3326D&o[2][ot]=sma&o[2][op]=20&o[2][oc]=DC32B363&o[3][ot]=patterns&o[3][op]=&o[3][oc]=000"
      : ""
  }`;
  const checkedInputs = [
    {
      name: "Long",
      color: "green",
    },
    {
      name: " Short ",
      color: "red",
    },
    {
      name: " Double Top ",
      color: "red",
    },
    {
      name: " Fib Retracment ",
      color: "#2020a0",
    },
    {
      name: " Upside Break ",
      color: "green",
    },
    {
      name: " Downside Break ",
      color: "red",
    },
    {
      name: " Double Bottom ",
      color: "green",
    },
    {
      name: " Bear Flag ",
      color: "red",
    },
    {
      name: " Bullish Flag ",
      color: "green",
    },
    {
      name: " Up Trendline ",
      color: "green",
    },
    {
      name: " Down Trendline  ",
      color: "red",
    },
    {
      name: " Consolidation  ",
      color: "#2020a0",
    },
  ];
  const handleChange = () => {
    setInputValue(inputRef.current.value);
  };
  const addToFavorites = async () => {
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);
    {
      if (docSnap.exists()) {
        await updateDoc(doc(db, "users", `${user}`), {
          stock: arrayUnion(x),
        });
        list?.includes(x) &&
          (await updateDoc(doc(db, "users", user), {
            stock: arrayRemove(x),
          }));
      } else {
        await setDoc(doc(db, "users", `${user}`), {
          stock: arrayUnion(x),
        });
      }
      !list?.includes(x)
        ? toast.success(`${x} Added`)
        : toast.error(`${x} Removed`);
    }
  };
  const handleSubmit = async (event) => {
    const docRef = doc(db, "users", user);
    event.preventDefault();
    const docSnap = await getDoc(docRef);
    console.log("object");
    if (docSnap.exists()) {
      inputValue.length == 0
        ? inputRef.current.focus()
        : await updateDoc(doc(db, "users", user), {
            comments: arrayUnion({
              info: `${frame ? "D" : "W"} : ${inputValue}`,
              stock: x,
              createdAt: Timestamp.now(),
            }),
          });
      setInputValue("");
    } else {
      await setDoc(doc(db, "users", user), {
        comments: arrayUnion({
          info: inputValue,
          stock: x,
          createdAt: Timestamp.now(),
        }),
      });
    }
  };
  function handleCheckboxChange(e, color) {
    const { value, checked } = e.target;
    !inputValue.includes(value)
      ? setInputValue([...inputValue, value])
      : setInputValue(
          inputValue.filter(function (item) {
            return item !== value;
          })
        );
    setFilterColors(color);
    e.target.checked = 0;
  }

  return (
    <div key={i} className={`stockCard ${x} py-5  space-y-4   `}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className={`stockImgRow ${x} `}>
        {toggoleBetweenFinToTradingView ? (
          <img
            className="w-full "
            key={i}
            src={finvizStockUrl}
            alt="A picture"
          />
        ) : (
          <TradingViewWidget stock={x} width={width} />
        )}
      </div>
      <div className={`stockUpperRow items-center  flex ${x} `}>
        <div
          className={` w-32  flex justify-center items-center h-12 hover:scale-105 ${
            !list?.includes(x) ? "text-gray-700" : "text-yellow-400"
          }  `}
          onClick={() =>
            user
              ? addToFavorites(x)
              : toast.error(`Must Login To Add ${x} To Favorites `)
          }
        >
          <AiFillStar className={`w-10 h-10`} />
        </div>
        <a
          className="text-md w-32  flex justify-center h-12 items-center text-lg text-blue-600    hover:text-gray-900 hover:scale-105 "
          href={tradingViewURL}
          target="_blank"
        >
          {x}
        </a>
        <div className="flex text-gray-700  border-[1px] rounded-lg h-12  justify-around w-32   items-center   ">
          <TbChartDots3
            className={` ${
              toggole ? "text-gray-50 bg-blue-500  " : ""
            } h-8  w-8 border-[1px] p-1 hover:text-gray-50 hover:bg-blue-500 hover:shadow-lg  rounded-lg `}
            onClick={() => setToggole(!toggole)}
          />
          <TiChartLine
            className={` ${
              !toggoleBetweenFinToTradingView ? "text-gray-50 bg-blue-500 " : ""
            } h-8 w-8 border-[1px] p-1 hover:text-gray-50 hover:bg-blue-500 hover:shadow-lg rounded-lg `}
            onClick={() =>
              setToggoleBetweenFinToTradingView(!toggoleBetweenFinToTradingView)
            }
          />
        </div>
      </div>
      <div
        className={`flex flex-wrap  items-center  justify-center  text-[10px] md:text-[12px] space-x-1 md:space-x-3`}
      >
        {checkedInputs.map(({ name, color }) => (
          <label
            style={{
              backgroundColor: `${inputValue.includes(name) ? color : "white"}`,
            }}
            className={` ${
              inputValue.includes(name) && ` text-white font-bold   `
            } cbtn p-2 rounded-full md:text-[15px] text-gray-700 text-[10px] px-3 my-1 hover:bg-stone-100 hover:text-${color}-500 font-medium  backdrop-blur-lg border  shadow-lg flex items-center justify-center `}
          >
            <input
              className=" opacity-0 hidden  "
              type="checkbox"
              value={name}
              onChange={handleCheckboxChange}
            />
            {name}
          </label>
        ))}
      </div>
      {
        <form
          className="flex  items-center  justify-center space-x-2"
          onSubmit={handleSubmit}
        >
          {inputValue.length > 0 && (
            <BsFillEraserFill
              onClick={() => setInputValue("")}
              className={`w-6 h-6 text-blue-500 hover:text-red-500 transition-all ease-in duration-300 `}
            />
          )}
          <input
            className=" border-2 px-2  shadow-2xl h-10   w-1/2 rounded-3xl focus:border-blue-500  "
            type="text"
            ref={inputRef}
            onChange={handleChange}
            value={inputValue}
            placeholder={`Write Comments About ${x}`}
          />
          <button
            className=" rounded-full h-10 w-24 px-4  border hover:bg-blue-500 hover:text-white  bg-white text-blue-500"
            type="submit"
          >
            Send
          </button>
        </form>
      }
      <div className="flex-wrap flex   text-[10px] md:text-[15px]  md:space-x-3 ">
        {comments &&
          comments.map((item) => <div className="comment">{item}</div>)}
      </div>
    </div>
  );
}

export default stockCard;
