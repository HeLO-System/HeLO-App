/* eslint-disable @next/next/no-img-element */
import { BackButton } from "@components/BackButton";
import { GlassPanel } from "@components/GlassPanel";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";

const ReportMatch: FC = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <div className="flex flex-col gap-8 text-white h-full" id="masked-overflow">
      <BackButton className="mt-10 ml-10" />
      <GlassPanel className="p-4 mx-10 pb-8 mb-20">test</GlassPanel>
    </div>
  );
};

export default ReportMatch;
