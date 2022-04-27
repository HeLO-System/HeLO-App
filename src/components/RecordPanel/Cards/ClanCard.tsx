/* eslint-disable @next/next/no-img-element */
import { ClanIcon } from "@components/ClanIcon";
import { Shield24Filled, Trophy24Filled } from "@fluentui/react-icons";
import { Clan } from "@types";
import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";
import { RecordCard } from "./RecordCard";

interface ClanCardProps {
  clan?: Clan;
  className?: string;
}

export const ClanCard: FC<ClanCardProps> = ({ clan, className }) => (
  <RecordCard>
    <Link href={clan ? `/clans/${clan.tag}` : ""}>
      <a className={classNames("flex flex-col items-center p-4", className)}>
        <div
          className={classNames("relative h-16 w-16", {
            "animate-pulse bg-border": !clan,
          })}
        >
          <ClanIcon
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            imageProps={{ height: 128, width: 128, quality: 50 }}
            logoClassName="fill-white"
            icon={clan?.icon}
          />
        </div>
        <h1
          className={classNames("text-lg text-center", {
            "animate-pulse bg-border h-5 my-1 rounded-md w-2/3": !clan,
          })}
        >
          {clan && clan.name}
        </h1>
        <div className="grid w-full grid-cols-4 md:grid-cols-2">
          <Trophy24Filled className="h-4 text-accent self-center justify-self-end" />
          <span
            className={classNames({
              "animate-pulse bg-border h-3 rounded-md": !clan,
            })}
          >
            {clan && clan.score}
          </span>
          <Shield24Filled className="h-4 self-center justify-self-end" />
          <span
            className={classNames({
              "animate-pulse bg-border h-3 rounded-md": !clan,
            })}
          >
            {clan && clan.num_matches}
          </span>
        </div>
      </a>
    </Link>
  </RecordCard>
);
