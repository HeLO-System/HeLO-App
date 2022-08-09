import classNames from "classnames";
import { FC } from "react";

export const WinLoseBanner: FC<{ caps1?: number; caps2?: number }> = ({
  caps1,
  caps2,
}) => {
  let text = "DEFEAT";
  let background = "bg-red-800";

  if (caps1 === undefined || caps2 === undefined) {
    text = "\u200B";
    background = "bg-gray-700";
  } else if (caps1 > caps2) {
    text = "VICTORY";
    background = "bg-green-800";
  }

  return (
    <div
      className={classNames(
        "w-full text-center mb-2 font-semibold",
        background
      )}
    >
      {text}
    </div>
  );
};
