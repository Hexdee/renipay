import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Spinner from "@app/components/Spinner";
import TableBodyPlaceholder from "@app/components/TableBodyPlaceholder";
import classNames from "classnames";

const Table = ({ children, emptyTableText, isLoading, spinPosition }) => {
  return (
    <table
      className={classNames("w-full relative min-w-[300px] h-max", {
        "h-[100px]": isLoading,
      })}
    >
      {/* <tableHeader data={tableHeader} />
       */}

      {React.Children.toArray(children)?.map((item, index) => {
        if (index === 1 && isLoading) {
          return (
            <>
              <div className="my-2 hidden md:block">Loading...</div>
              <TableBodyPlaceholder position={spinPosition}>
                <Spinner color="dark" show />
              </TableBodyPlaceholder>
            </>
          );
        }
        if (index === 1 && emptyTableText) {
          return (
            <p className="absolute w-full text-center my-5 text-h3 text-black-07">
              {emptyTableText}
            </p>
          );
        }
        return item;
      })}
      {/* <tableBody data ={} /> */}
    </table>
  );
};

Table.Header = TableHeader;
Table.Body = TableBody;

export default Table;
