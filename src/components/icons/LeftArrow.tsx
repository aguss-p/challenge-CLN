import React, { SVGProps } from "react";

const LeftArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="8"
    height="13"
    viewBox="0 0 8 13"
    fill="none"
    stroke="#2C9084"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.85576 1.05689L1.25391 6.63467L6.85576 12.2134"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LeftArrow;
