import React from "react";

const TableBody = ({ children }) => {
  return (
    <>
      <div className="w-full h-[8px]"></div>
      {children}
    </>
  );
};

export default TableBody;
