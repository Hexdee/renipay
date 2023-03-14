import * as React from "react";
const SvgPadlock = (props) => (
  <svg
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.444 8.111V4.556a3.556 3.556 0 0 1 7.112 0M9 11.666v1.778M3.667 17h10.666c.982 0 1.778-.796 1.778-1.778V9.89c0-.982-.796-1.778-1.778-1.778H3.667c-.982 0-1.778.796-1.778 1.778v5.333c0 .982.796 1.778 1.778 1.778Z"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
    />
  </svg>
);
export default SvgPadlock;
