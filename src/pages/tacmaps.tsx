/* eslint-disable @next/next/no-img-element */
import { BackButton } from "@components/BackButton";
import { GlassPanel } from "@components/GlassPanel";
import { Tacmaps } from "@components/Tacmap";
import { FC } from "react";

const ReportMatch: FC = () => (
  <div className="flex flex-col gap-8 text-white h-full" id="masked-overflow">
    <BackButton className="mt-10 ml-10" />
    <GlassPanel className="p-4 mx-10 pb-8 mb-20" title="Tacmap generator">
      <Tacmaps />
    </GlassPanel>
  </div>
);

export default ReportMatch;
