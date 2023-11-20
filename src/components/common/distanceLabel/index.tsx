import LocationMark from "@/components/icons/LocationMark";
import React from "react";

type Props = {
  distance: number;
};

const DistanceLabel = (props: Props) => {
  const { distance } = props;
  return (
    <div className="flex gap-2 items-center">
      <LocationMark fill="gray" />
      <p className="text-xs text-grey">{`${distance} Km`}</p>
    </div>
  );
};

export default DistanceLabel;
