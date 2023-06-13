import { useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { db } from "../firebaseConfig";
import Card from "./Card";
import Header from "./Header";
import { StoreContext } from "./Store";
import { subscribeToUserData, fetchData } from "./utils";
import filterData from "./utils";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
const Home = () => {
  const { data: session, status } = useSession();
  const user = session?.user?.email;
  const [data, setData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [value1, setValue1] = useState(0);
  const { state, dispatch } = useContext(StoreContext);
  const [info, setInfo] = useState();

  useEffect(() => {
    const unsubscribe = subscribeToUserData(user, db, setInfo);

    return () => {
      unsubscribe();
    };
  }, [session, db, user, setInfo]);

  useEffect(() => {
    filterData(data, state.search, setFilteredItems);
    setValue1(0);
  }, [state.search]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  async function fetchInitialData() {
    try {
      const responseData = await fetchData("/api/data");
      setData(responseData || []);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  }

  return (
    <div className="min-h-screen relative bg-white">
      <Header />
      {filteredItems.length > 0 ? (
        <div className="overflow-x-auto">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${state.value}, 1fr)`,
            }}
            className="mt-4 gap-2"
          >
            {filteredItems?.slice(value1, value1 + 40).map((x, i) => (
              <Card
                x={x}
                i={i}
                list={info?.stock}
                user={session?.user?.email}
                info={info}
                comments={info?.comments
                  ?.map((item) => item.stock == x && item.info)
                  .filter(Boolean)}
              />
            ))}
          </div>
        </div>
      ) : (
        state.search && (
          <div className="w-[100vw] h-[70vh] flex items-center justify-center">
            <div className="card w-96 bg-primary text-primary-content">
              <div className="card-body">
                <h2 className="card-title">No results</h2>
                <p>Write A New Search</p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => inputRef.current.focus()}
                    className="btn"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {filteredItems.length > 0 && filteredItems.length > 20 && (
        <div className="flex justify-center items-center text-gray-700 hover:scale-110 transition duration-300 sticky rounded-2xl p-4">
          {value1 !== 0 && (
            <button
              onClick={() => {
                if (value1 !== 0) {
                  setValue1(value1 - 40);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center justify-center w-12 h-12 hover:text-blue-500 focus:outline-none"
            >
              <AiOutlineArrowLeft className="w-6 h-6" />
            </button>
          )}

          <p className="w-32 text-center">
            {`${value1 + 1} - ${Math.min(value1 + 40, filteredItems.length)}`}
          </p>

          {value1 + 40 < filteredItems.length && (
            <button
              onClick={() => {
                if (value1 + 40 < filteredItems.length) {
                  setValue1(value1 + 40);
                  window.scrollTo({ top: 0, behavior: "auto" });
                }
              }}
              className="flex items-center justify-center w-12 h-12 hover:text-blue-500 focus:outline-none"
            >
              <AiOutlineArrowRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
