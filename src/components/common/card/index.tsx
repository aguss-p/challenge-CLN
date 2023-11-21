import Image from "next/image";
import React from "react";

type Props = {
  title: React.ReactElement;
  description?: React.ReactElement;
  footer?: React.ReactElement;
  img: string;
  id: string;
  url?: string;
  className?: string;
};

const Card = (props: Props) => {
  const { description, footer, img, title, className = "", url, id } = props;
  return (
    <div className="w-[200px] min-w-[200px] rounded-t-md border-solid border-[1px] border-[rgb(244,244,244)] ">
      <a href={url ?? ""} target="_blank" rel="noopener noreferrer">
        <Image
          alt={`card-image-${id}`}
          width={200}
          height={115}
          src={img}
          className="w-[200px] min-w-[200px] h-[115px] rounded-t-md"
        />
      </a>
      <div
        className={`flex flex-col gap-2 p-2 pt-3 rounded-b-md h-auto ${className}`}
      >
        {title}
        {description}
        {footer}
      </div>
    </div>
  );
};

export default Card;
