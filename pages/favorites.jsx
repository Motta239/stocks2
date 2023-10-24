import Header from "./Header";
import { useContext, useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Card from "./Card";
import { useSession } from "next-auth/react";
import { db } from "../firebaseConfig";
import { StoreContext } from "./Store";

import { subscribeToUserData } from "./utils";
const FavoritesPage = () => {
  const { data: session, status } = useSession();
  const user = session?.user?.email;
  const [userData, setUserData] = useState(null);
  //fetch favorites list
  useEffect(() => {
    const unsubscribe = subscribeToUserData(user, db, setUserData);
  const { state, dispatch } = useContext(StoreContext);
    return () => {
      unsubscribe();
    };
  }, [session, db, user, setUserData]);
  return (
    <div>
      <Header />
      <div
        style={{
          display: "grid",
         gridTemplateColumns: `repeat(${state.value}, 1fr)`,
          gap: "2rem", // Adjust the gap as needed
        }}
      >
        {userData?.stock?.map((x, i) => (
          <Card
            x={x}
            i={i}
            user={user}
            list={userData?.stock}
            info={userData}
            comments={userData?.comments
              ?.map((item) => item.stock == x && item.info)
              .filter(Boolean)}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
