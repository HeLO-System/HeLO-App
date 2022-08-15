/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-underscore-dangle */

import { BackButton } from "@components/BackButton";
import { MatchDetails } from "@components/MatchDetails";
import { useMatches } from "@queries";
import { SortedMatch } from "@types";
import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const playerDist = (playersDist: number[], players: number): number[] =>
  playersDist.length ? playersDist : [players];

interface ServerSideProps {
  matchId: string;
}

const MatchPage: NextPage<ServerSideProps> = ({ matchId }) => {
  const router = useRouter();
  const [match, setMatch] = useState<SortedMatch>();
  const { data: matches, error } = useMatches({ match_id: matchId });

  useEffect(() => {
    if (matches && matches[0]) {
      const data = matches[0];

      if (data.side1 === "Allies")
        setMatch({
          ...data,
          axis_clan_ids: data.clans2_ids,
          allies_clan_ids: data.clans1_ids,
          axis_player_dist: playerDist(data.player_dist2, data.players),
          allies_player_dist: playerDist(data.player_dist1, data.players),
          axis_caps: data.caps2,
          allies_caps: data.caps1,
          axis_conf: data.conf2,
          allies_conf: data.conf1,
        });
      else
        setMatch({
          ...data,
          axis_clan_ids: data.clans1_ids,
          allies_clan_ids: data.clans2_ids,
          axis_player_dist: playerDist(data.player_dist1, data.players),
          allies_player_dist: playerDist(data.player_dist2, data.players),
          axis_caps: data.caps1,
          allies_caps: data.caps2,
          axis_conf: data.conf1,
          allies_conf: data.conf2,
        });
    }
  }, [matches]);

  useEffect(() => {
    if (error) {
      router.push("/404");
    }
  }, [error, router]);

  return (
    <>
      <NextSeo title={matchId} />

      <div
        className="flex flex-col gap-8 text-white h-full"
        id="masked-overflow"
      >
        <div className="flex flex-row">
          <BackButton className="mt-10 ml-10" />
        </div>
        {match && <MatchDetails match={match} />}
      </div>
    </>
  );
};

export default MatchPage;

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
  // eslint-disable-next-line @typescript-eslint/require-await
) => ({ props: { matchId: context.query.mid?.toString() as string } });
