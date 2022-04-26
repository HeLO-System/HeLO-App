import { BackButton } from "@components/BackButton";
import { GlassPanel } from "@components/GlassPanel";
import NoSSR from "@components/NoSSR/NoSSR";
import { useMatches } from "@queries";
import { Map } from "@types";
import { enumKeys } from "@util";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

const Statistics: NextPage = () => {
  const [loaded, setLoaded] = useState(false);
  const data = enumKeys(Map).map((map) => ({
    name: Map[map],
    total: 0,
    axisWins: 0,
    alliesWins: 0,
  }));
  const { data: rawData } = useMatches(
    { select: "side1,caps1,map" },
    { enabled: !loaded }
  );

  useEffect(() => {
    if (rawData) {
      setLoaded(true);
      rawData.forEach((match) => {});
    }
  }, [rawData]);

  return (
    <div className="flex flex-col gap-8 text-white h-full" id="masked-overflow">
      <BackButton className="mt-10 ml-10" />
      <GlassPanel title="Statistics" className="p-4 mx-10 pb-8">
        <NoSSR></NoSSR>
      </GlassPanel>
    </div>
  );
};

export default Statistics;
