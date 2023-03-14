import classNames from "classnames";
import React from "react";

const Skeleton = ({ width = 20, height = 12, className, fullWidth }) => {
  return (
    <span
      style={{
        width: !fullWidth ? `${width}px` : "100%",
        height: `${height}px`,
      }}
      className={classNames(
        "inline-block animate-pulse bg-neutral-01 ",
        {
          "w-full": fullWidth,
        },
        className
      )}
    ></span>
  );
};

export default Skeleton;
