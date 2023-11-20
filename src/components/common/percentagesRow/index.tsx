import React from "react";

type Props = {
  percentages: Array<number>;
};
const PercentagesRow = (props: Props) => {
  const { percentages } = props;

  const colourArray = ["#000038", "#0934B3", "#3392FF"];

  return (
    <div className="flex gap-2">
      {percentages.map((p, i) => {
        if (p > 0)
          return (
            <p
              key={i}
              className={`text-xs font-medium text-[${colourArray[i]}]`}
            >
              {`${p}%`}
            </p>
          );
      })}
    </div>
  );
};

export default PercentagesRow;
