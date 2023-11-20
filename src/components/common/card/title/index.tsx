import React from "react";

type Props = {
  text: string;
  className?: string;
};

const Title = (props: Props) => {
  const { text, className = "" } = props;
  return (
    <p
      className={`text-start font-medium  max-w-full text-ellipsis whitespace-nowrap overflow-hidden ${className}`}
    >
      {text}
    </p>
  );
};

export default Title;
