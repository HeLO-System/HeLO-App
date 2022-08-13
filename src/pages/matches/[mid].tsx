/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-underscore-dangle */

import { BackButton } from "@components/BackButton";
import { MatchDetails } from "@components/MatchDetails";
import { useMatch } from "@queries";
import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface ServerSideProps {
  matchId: string;
}

const MatchPage: NextPage<ServerSideProps> = ({ matchId }) => {
  const router = useRouter();
  const { data: match, error } = useMatch(matchId);

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
