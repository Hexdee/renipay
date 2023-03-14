import * as React from "react";
const SvgToastIconSuccess = (props) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={20} height={20} rx={4} fill="#1CCB57" />
    <g clipPath="url(#toast-icon-success_svg__a)">
      <g clipPath="url(#toast-icon-success_svg__b)">
        <path
          d="M10 3.333A6.67 6.67 0 0 0 3.333 10 6.67 6.67 0 0 0 10 16.667 6.67 6.67 0 0 0 16.667 10 6.67 6.67 0 0 0 10 3.333ZM8.193 12.86 5.8 10.467a.664.664 0 1 1 .94-.94l1.927 1.92 4.586-4.587a.664.664 0 1 1 .94.94l-5.06 5.06a.664.664 0 0 1-.94 0Z"
          fill="#fff"
        />
      </g>
    </g>
    <defs>
      <clipPath id="toast-icon-success_svg__a">
        <path fill="#fff" transform="translate(2 2)" d="M0 0h16v16H0z" />
      </clipPath>
      <clipPath id="toast-icon-success_svg__b">
        <path fill="#fff" transform="translate(2 2)" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgToastIconSuccess;
