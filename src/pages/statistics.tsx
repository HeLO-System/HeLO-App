/* eslint-disable @next/next/no-img-element */
import { BackButton } from "@components/BackButton";
import { AvgDurationChart, MapsChart } from "@components/charts";
import { FactionWinrateChart } from "@components/charts/FactionWinrate";
import { GlassPanel } from "@components/GlassPanel";
import NoSSR from "@components/NoSSR/NoSSR";
import { FC } from "react";

const Statistics: FC = () => (
  <div className="flex flex-col gap-8 text-white h-full" id="masked-overflow">
    <BackButton className="mt-10 ml-10" />
    <GlassPanel title="Statistics" className="p-4 mx-10 pb-8 mb-20">
      <NoSSR>
        <div className="grid lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-5 justify-items-stretch">
          <MapsChart />
          <FactionWinrateChart />
          <AvgDurationChart />
        </div>
      </NoSSR>
    </GlassPanel>
  </div>
);

export default Statistics;
