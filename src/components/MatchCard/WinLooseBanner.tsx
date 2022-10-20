import classNames from "classnames";
import { FC } from "react";

const MAX_CAPS = 5;

type WinLoseBannerProps = {
  friendlyCaps?: number;
  enemyCaps?: number;
  offensive?: boolean;
  attacker?: boolean;
};

export const WinLoseBanner: FC<WinLoseBannerProps> = ({
  friendlyCaps,
  enemyCaps,
  offensive,
  attacker,
}) => {
  let text = "DEFEAT";
  let background = "bg-red-800";

  if (friendlyCaps === undefined || enemyCaps === undefined) {
    text = "\u200B";
    background = "bg-gray-700";
  } else if (
    (offensive && (attacker ? friendlyCaps === MAX_CAPS : enemyCaps !== MAX_CAPS)) ||
    (!offensive && friendlyCaps > enemyCaps)
  ) {
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
