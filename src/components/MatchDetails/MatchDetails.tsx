/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Grid, Stack, useBreakpointValue } from "@chakra-ui/react";
import { GlassPanel } from "@components/GlassPanel";
import { SortedMatch } from "@types";
import { FC } from "react";
import { ClanStack } from "./ClanStack";

const isWinner = (caps: number) => (caps >= 3 ? "Victory" : "Defeat");

type MatchDetailsProps = { match: SortedMatch };

export const MatchDetails: FC<MatchDetailsProps> = ({ match }) => {
  const reverse = useBreakpointValue({ base: false, md: true });

  return (
    <>
      <GlassPanel
        title={match.match_id}
        className="p-4 mx-10"
        backTitle={match.event}
      >
        <Grid
          templateColumns={{
            base: "max-content 1fr max-content",
            md: "max-content 1fr min-content 1fr max-content",
          }}
          alignItems="center"
          className="text-3xl"
        >
          <img
            src="/ico_HLLAxis.png"
            alt="Axis Logo"
            className="h-8 w-8 inline mr-2"
          />
          <span className="hidden md:inline">{isWinner(match.axis_caps)}</span>
          <span className="whitespace-nowrap text-4xl text-center">{`${match.axis_caps} : ${match.allies_caps}`}</span>
          <span className="hidden md:inline text-right">
            {isWinner(match.allies_caps)}
          </span>
          <img
            src="/ico_HLLAllies.png"
            alt="Axis Logo"
            className="h-8 w-8 inline ml-2"
          />
        </Grid>
        <Stack
          direction={{ base: "column", md: "row" }}
          className="mt-2 w-full"
        >
          <ClanStack
            clanIds={match.axis_clan_ids}
            playerDist={match.axis_player_dist}
          />

          <div
            className={`
          border-white
          border-l
          border-t
          relative
          after:content-['vs']
          after:absolute
          after:top-1/2
          after:left-1/2
          after:-translate-x-1/2
          after:-translate-y-1/2
          after:bg-border
          after:rounded-full
          after:w-10
          after:h-10
          after:text-center
          after:leading-[2.1rem]
          after:border-white
          after:border
          after:font-bold
          after:text-[1.2rem]
          !my-7
          md:!my-0
        `}
          />
          <ClanStack
            clanIds={match.allies_clan_ids}
            playerDist={match.allies_player_dist}
            reverse={reverse}
          />
        </Stack>
        <div className="w-full text-center text-xl">{match.duration} min</div>
        {match.stream && (
          <a
            href={match.stream}
            className="text-accent text-center w-full block"
          >
            {new URL(match.stream).hostname}
          </a>
        )}
      </GlassPanel>
      <GlassPanel title={match.map} className="p-4 mx-10 mb-20">
        <div className="flex justify-center">
          <img
            src={`https://tacmaps.helo-system.de/tacmap?map=${match.map}${
              match.strongpoints?.length
                ? `&strongpoints${match.strongpoints.join(",")}`
                : ""
            }&width=960&height=960&axisColor=red&alliesColor=blue&axisCaps=${
              match.axis_caps
            }&alliesCaps=${match.allies_caps}`}
            className="max-h-screen object-contain"
          />
        </div>
      </GlassPanel>
    </>
  );
};
