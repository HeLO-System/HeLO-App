/* eslint-disable @next/next/no-head-element */
import { ClanDetails } from "@components/ClanDetails";
import { GlassPanel } from "@components/GlassPanel";
import { MatchDetails } from "@components/MatchDetails";
import { ArrowLeft24Regular } from "@fluentui/react-icons";
import { fetchMatches, useClan } from "@queries";
import { range } from "@util";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

const lastMatchesLength = 5;

interface ServerSideProps {
  clanTag: string;
}

const ClanPage: NextPage<ServerSideProps> = ({ clanTag }) => {
  const router = useRouter();

  const { data: clan } = useClan(clanTag);
  const matchesParams = {
    sort_by: "date",
    limit: lastMatchesLength,
    desc: true,
    clan_ids: clan?._id.$oid,
  };
  const { data: lastMatches } = useQuery(
    ["matches", matchesParams],
    () => fetchMatches(matchesParams),
    { enabled: !!clan }
  );

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
            {lastMatches ? (
              lastMatches.length > 0 ? (
                lastMatches?.map((match) => (
                  <MatchDetails
                    match={match}
                    clanId={clan?._id.$oid}
                    key={match._id.$oid}
                  />
                ))
              ) : (
                <span className="text-center text-xl font-semibold">
                  No matches found
                </span>
              )
            ) : (
              range(lastMatchesLength).map((index) => (
                <MatchDetails key={index} />
              ))
            )}
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