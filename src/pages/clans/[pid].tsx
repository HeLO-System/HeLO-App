/* eslint-disable @next/next/no-head-element */
import { ClanDetails } from "@components/ClanDetails";
import { GlassPanel } from "@components/GlassPanel";
import { MatchDetails } from "@components/MatchDetails";
import { ArrowLeft24Regular } from "@fluentui/react-icons";
import { Clan, Match } from "@types";
import { fetchData, range } from "@util";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const lastMatchesLength = 5;

interface ServerSideProps {
  clanTag: string;
}

const ClanPage: NextPage<ServerSideProps> = ({ clanTag }) => {
  const router = useRouter();
  const [clan, setClan] = useState<Clan>();
  const [lastMatches, setLastMatches] = useState<Match[]>();

  const { pid } = router.query;

  useEffect(() => {
    if (pid) {
      fetchData<Clan>(`/api/clan/${pid as string}`)
        .then((clanData: Clan) => {
          setClan(clanData);
          if (clanData.tag !== pid) {
            history.pushState(null, "", clanData.tag);
          }
          fetchData<Match[]>(
            `/api/matches?limit=${lastMatchesLength}&sort_by=date&desc=true&clan_ids=${clanData._id.$oid}`
          )
            .then((matchData: Match[]) => {
              setLastMatches(matchData);
            })
            .catch(null);
        })
        .catch(() => {
          void router.push("/404");
        });
    }
  }, [pid, router]);

  return (
    <>
      <Head>
        <title> {clan?.name ? `HeLO | ${clanTag}` : "HeLo-System"}</title>
        <meta
          property="og:image"
          content={`https://${
            process.env.NEXT_PUBLIC_VERCEL_URL || "helo-system.de"
          }/api/og-image?clan=${clanTag}`}
        />
      </Head>

      <div
        className="flex flex-col gap-8 text-white h-full"
        id="masked-overflow"
      >
        <button
          className="w-min mt-10 ml-10"
          onClick={(): void => {
            void router.push("/");
          }}
        >
          <GlassPanel className="p-2 flex gap-2 items-center  text-xl font-gotham-book">
            <ArrowLeft24Regular />
            <span className="whitespace-nowrap">HeLO-System</span>
          </GlassPanel>
        </button>

        <ClanDetails clan={clan} />

        <GlassPanel title="Recent matches" className="p-4 mx-10">
          <div className="grid md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-5">
            {lastMatches
              ? lastMatches.map((match) => (
                  <MatchDetails
                    match={match}
                    clanId={clan?._id.$oid}
                    key={match._id.$oid}
                  />
                ))
              : range(lastMatchesLength).map((index) => (
                  <MatchDetails key={index} />
                ))}
          </div>
        </GlassPanel>
      </div>
    </>
  );
};

export default ClanPage;

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
  // eslint-disable-next-line @typescript-eslint/require-await
) => ({ props: { clanTag: context.query.pid as string } });
