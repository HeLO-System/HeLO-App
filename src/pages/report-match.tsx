import { BackButton } from "@components/BackButton";
import { GlassPanel } from "@components/GlassPanel";
import { MatchReportForm } from "@components/MatchReport";
import { isTeamManager } from "@util";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const ReportMatch: FC = () => {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || !isTeamManager(data)) {
      router.push("/");
    }
  }, [data, router, status]);

  return (
    <div className="flex flex-col gap-8 text-white h-full" id="masked-overflow">
      <BackButton className="mt-10 ml-10" />
      <GlassPanel className="p-4 mx-10 pb-8 mb-20">
        <MatchReportForm />
      </GlassPanel>
    </div>
  );
};

export default ReportMatch;
