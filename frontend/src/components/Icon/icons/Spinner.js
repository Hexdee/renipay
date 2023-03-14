import * as React from "react";
const SvgSpinner = (props) => (
  <svg className="spinner_svg__spinner" viewBox="0 0 50 50" {...props}>
    <circle
      className="spinner_svg__path"
      cx={25}
      cy={25}
      r={20}
      fill="none"
      strokeWidth={5}
      stroke="currentColor"
    />
  </svg>
);
export default SvgSpinner;
