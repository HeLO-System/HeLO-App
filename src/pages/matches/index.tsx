/* eslint-disable @next/next/no-img-element */
import { BackButton } from "@components/BackButton";
import { GlassPanel } from "@components/GlassPanel";
import { MatchesTable } from "@components/MatchesTable";
import { FC } from "react";

const MatchesList: FC = () => (
  <div className="flex flex-col gap-8 text-white h-full" id="masked-overflow">
    <BackButton className="mt-10 ml-10" />
    <GlassPanel title="Matches" className="p-4 mx-10 pb-8 mb-20">
      <MatchesTable pagination />
    </GlassPanel>
  </div>
);

export default MatchesList;
