import * as React from "react";
const SvgBoard = (props) => (
  <svg
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeWidth={1}
      d="M4 14h8v2H4v-2Zm0-4h8v2H4v-2Zm6-10H2C.9 0 0 .9 0 2v16c0 1.1.89 2 1.99 2H14c1.1 0 2-.9 2-2V6l-6-6Zm4 18H2V2h7v5h5v11Z"
      fill="currentColor"
      fillOpacity={0.87}
    />
  </svg>
);
export default SvgBoard;
