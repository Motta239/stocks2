import React from "react";

function comment({ item, i }) {
  return (
    <div
      key={i}
      className="flex items-center relative space-x-2 comment rounded-xl  tr300  ease-in-out border-[0.5px]   "
    >
      <div className="">{item}</div>
    </div>
  );
}

export default comment;
