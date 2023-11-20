import React, { SVGProps } from "react";

const Hamburger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 50 50"
    {...props}
  >
    <path d="M3 9a1 1 0 1 0 0 2h44a1 1 0 1 0 0-2H3zm0 15a1 1 0 1 0 0 2h44a1 1 0 1 0 0-2H3zm0 15a1 1 0 1 0 0 2h44a1 1 0 1 0 0-2H3z" />
  </svg>
);
export default Hamburger;
