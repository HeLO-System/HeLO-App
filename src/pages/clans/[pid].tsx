/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @next/next/no-head-element */
import { BackButton } from "@components/BackButton";
import {
  ScoreOverTimeChart,
  WinrateByMapChart,
  WinrateChart,
} from "@components/charts";
import { ClanDetails } from "@components/ClanDetails";
import { GlassPanel } from "@components/GlassPanel";
import { MatchDetails } from "@components/MatchDetails";
import { MatchesTable } from "@components/MatchesTable";
import NoSSR from "@components/NoSSR/NoSSR";
import { useClan, useMatches } from "@queries";
import { range } from "@util";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

const lastMatchesLength = 5;
interface ServerSideProps {
  clanTag: string;
}

const ClanPage: NextPage<ServerSideProps> = ({ clanTag }) => {
  const { data: clan } = useClan(clanTag);

  const { data: lastMatches } = useMatches(
    {
      sort_by: "date",
      limit: lastMatchesLength,
      desc: true,
      clan_ids: clan?._id.$oid,
    },
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
        <BackButton className="mt-10 ml-10" />

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
        <GlassPanel title="Statistics" className="p-4 mx-10">
          <NoSSR>
            <div className="grid lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-5 justify-items-stretch">
              <ScoreOverTimeChart clanId={clan?._id.$oid} />
              <WinrateChart clanId={clan?._id.$oid} />
              <WinrateByMapChart clanId={clan?._id.$oid} />
            </div>
          </NoSSR>
        </GlassPanel>
        <MatchesTable clanId={clan?._id.$oid} />
      </div>
    </>
  );
};

export default ClanPage;

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
  // eslint-disable-next-line @typescript-eslint/require-await
) => ({ props: { clanTag: context.query.pid as string } });
