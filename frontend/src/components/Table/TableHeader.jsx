import classNames from "classnames";
import React from "react";

const TableHeader = (props) => {
  const { data } = props;
  return (
    <thead className="">
      <tr className="px-2 border-b-[1px] border-b-gray-02">
        {/* <th className="max-w-[4/10] pl-2 "> Original Url</th>
        <th className=" ">Short Url</th>
        <th className="w-[18/100] ">Last Date Visited </th>
        <th className="w-[2/10]  text-white pr-2"></th> */}
        {data.map((item) => (
          <th
            className={classNames(
              "text-primary-01/90" ,
              {
                // `${item[2]}`: item[2],
                "w-[calc(1/20*100%)]": item.fraction === "oneth_twenty",
                "w-[calc(1/10*100%)]": item.fraction === "oneth",
                "w-[calc(2/10*100%)]": item.fraction === "twoth",
                "w-[calc(3/10*100%)]": item.fraction === "threeth",
                "w-[calc(4/10&100%]]": item.fraction === "quarter",
                "w-[calc(5/10*100%)]": item.fraction === "fifth",
                "w-[calc(6/10*100%)]": item.fraction === "sixth",
                "w-[calc(7/10*100%)]": item.fraction === "seventh",
                "w-[calc(8/10*100%)]": item.fraction === "eighth",
                "w-[calc(9/10*100%)]": item.fraction === "ninth",
                "w-[calc(100%)]": item.fraction === "tenth",
              },
              item.width,
              item.className
            )}
          >
            {item.name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
