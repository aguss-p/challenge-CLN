import * as React from "react";
import { SVGProps } from "react";

const RightArrow = (props: SVGProps<SVGSVGElement>) => (
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
      d="M1.14424 1.05676L6.74609 6.63454L1.14424 12.2133"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default RightArrow;
