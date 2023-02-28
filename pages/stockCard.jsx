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
BsFillEraserFill;
function stockCard({ x, i, frame, list, user, comments }) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [toggole, setToggole] = useState(false);
  const tradingViewURL = `https://www.tradingview.com/chart/oMvKxzcu/?symbol=${x}`;
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
      color: "gray",
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
      color: "gray",
    },
  ];
  // const objectsArray = checkedInputs.map((str) => {
  //   return {
  //     name: str,
  //     color: "",
  //   };
  // });

  // console.log(objectsArray);
  const handleChange = () => {
    setInputValue(inputRef.current.value);
  };
  const addToFavorites = async () => {
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);
    console.log("object");
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
  function handleCheckboxChange(e) {
    const { value, checked } = e.target;
    checked && setInputValue([...inputValue, value]);
    e.target.checked = 0;
  }
  console.log(comments);
  return (
    <div key={i} className={`stockCard ${x} `}>
      <div className={`stockImgRow ${x} `}>
        <div className={`stockUpperRow ${x} `}>
          <div
            className={` w-32 hover:scale-105 ${
              !list?.includes(x) ? "text-black" : "text-yellow-400"
            }  `}
            onClick={() => addToFavorites(x)}
          >
            <AiFillStar className={`w-10 h-10`} />
          </div>

          <a
            className="text-md items-center text-lg text-blue-600 flex justify-center  hover:text-gray-900 hover:scale-105 "
            href={tradingViewURL}
            target="_blank"
          >
            {x}
          </a>

          <label className=" ">
            <input
              checked={toggole}
              type="checkbox"
              value="Add Technicals"
              onChange={() => setToggole(!toggole)}
            />
            Add Technicals
          </label>
        </div>

        <img className="w-full " key={i} src={finvizStockUrl} alt="A picture" />
      </div>
      <div
        className={`flex flex-wrap items-center mt-4 justify-center  text-[10px] md:text-[15px] space-x-1 md:space-x-3`}
      >
        {checkedInputs.map(({ name, color }) => (
          <label
            className={` ${
              inputValue.includes(name) &&
              `text-white bg-${color}-500 font-bold text-[15px]`
            } cbtn p-2 rounded-full px-3 my-1 font-medium  backdrop-blur-lg border  shadow-lg flex items-center justify-center `}
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
          className="flex m-6 items-center  justify-center space-x-2"
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
            className=" rounded-full p-3  border hover:bg-blue-500 hover:text-white  bg-white text-blue-500"
            type="submit"
          >
            Send
          </button>
        </form>
      }
      <div className="flex-wrap flex m-3  text-[10px] md:text-[15px]  md:space-x-3 ">
        {comments &&
          comments.map((item) => <div className="comment">{item}</div>)}
      </div>
    </div>
  );
}

export default stockCard;
