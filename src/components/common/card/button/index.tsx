import LocationMark from "@/components/icons/LocationMark";
import React, { Children } from "react";

type Props = {
  url: any;
  text: string;
};

const Button = (props: Props) => {
  const { url, text } = props;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <button className="font-bold p-1 rounded-sm border-solid border-white border-[1px] text-white text-xs">
        {text}
      </button>
    </a>
  );
};

export default Button;
