/* eslint-disable @next/next/no-img-element */
import { Shield24Filled, Trophy24Filled } from "@fluentui/react-icons";
import { Clan } from "@types";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

interface ClanCardProps {
  clan?: Clan;
  className?: string;
}

export const ClanCard: FC<ClanCardProps> = ({ clan, className }) => {
  const router = useRouter();

  return (
    <button
      className={classNames(
        "bg-e-2 rounded-lg hover:scale-105 shadow-elevation-1 text-font w-40 flex flex-col items-center py-4",
        className
      )}
      onClick={(): void => {
        if (clan) {
          router.push(`/clans/${clan.tag}`).catch(null);
        }
      }}
    >
      <div
        className={classNames("h-16 w-16", {
          "animate-pulse bg-border": !clan,
        })}
      >
        {clan &&
          (clan.icon ? (
            <img
              src={clan.icon}
              className="h-16 w-16 object-contain"
              alt="Clan Logo"
            />
          ) : (
            <Image
              src="/hll.png"
              height="64"
              width="64"
              className="rounded-full"
              alt="Clan Logo"
            />
          ))}
      </div>

      <h1
        className={classNames("text-lg", {
          "animate-pulse bg-border h-5 my-1 rounded-md w-2/3": !clan,
        })}
      >
        {clan && clan.name}
      </h1>
      <div className="flex w-full md:flex-col justify-around px-2 items-center">
        <div className="flex items-center w-1/2 justify-start ">
          <Trophy24Filled className="h-4 text-accent" />
          <span
            className={classNames("w-full", {
              "animate-pulse bg-border h-3 rounded-md": !clan,
            })}
          >
            {clan && clan.score}
          </span>
        </div>
        <div className="flex items-center w-1/2 justify-start">
          <Shield24Filled className="h-4" />
          <span
            className={classNames("w-full", {
              "animate-pulse bg-border h-3 rounded-md": !clan,
            })}
          >
            {clan && clan.num_matches}
          </span>
        </div>
      </div>
    </button>
  );
};
