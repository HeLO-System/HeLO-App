/* eslint-disable @next/next/no-img-element */
import { Stack } from "@chakra-ui/react";
import { BackButton } from "@components/BackButton";
import { GlassPanel } from "@components/GlassPanel";
import { TacmapForm } from "@components/TacmapForm";
import { FC, useState } from "react";

const ReportMatch: FC = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://tacmaps.helo-system.de?map=Carentan"
  );

  return (
    <div className="flex flex-col gap-8 text-white h-full" id="masked-overflow">
      <BackButton className="mt-10 ml-10" />
      <GlassPanel className="p-4 mx-10 pb-8 mb-20" title="Tacmap generator">
        <Stack gap={4}>
          <TacmapForm setImageUrl={setImageUrl} />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Tactical map"
              className="max-h-screen object-contain"
            />
          )}
        </Stack>
      </GlassPanel>
    </div>
  );
};

export default ReportMatch;
