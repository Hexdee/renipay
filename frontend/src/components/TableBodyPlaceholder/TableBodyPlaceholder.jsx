import classNames from "classnames";
import React from "react";
// import Spinner from '../Spinner'

const TableBodyPlaceholder = ({ children, position = "center" }) => {
  return (
    <div
      className={classNames(
        "w-[100%] h-16 flex justify-center items-center absolute top-full ",
        { "justify-start": position === "start" }
      )}
    >
      {children}
    </div>
  );
};

export default TableBodyPlaceholder;
