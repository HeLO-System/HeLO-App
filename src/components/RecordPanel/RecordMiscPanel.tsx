import { MiscRecords } from "@pages/api/misc-records";
import { range, useClanTags } from "@util";
import axios from "axios";
import { FC } from "react";
import { useQuery } from "react-query";
import { MiscRecordCard, RecordCard } from "./Cards";
import { DEFAULT_RECORD_COUNT, RecordPanel } from "./RecordPanel";

interface RecordMiscPanelProps {
  className?: string;
}

export const RecordMiscPanel: FC<RecordMiscPanelProps> = ({ className }) => {
  const { data: records } = useQuery("misc-records", () =>
    axios.get<MiscRecords>("/api/misc-records").then(({ data }) => data)
  );

  const { getTag } = useClanTags();

  return (
    <RecordPanel title="Misc Records" className={className}>
      {records ? (
        <>
          <MiscRecordCard
            title="Total Matches"
            record={records.total_matches}
            footer=""
          />
          <MiscRecordCard
            title="Registered Clans"
            record={records.total_clans}
            footer=""
          />
          <MiscRecordCard
            title="Most played Map"
            record={records.most_played_map.map}
            footer={records.most_played_map.count}
          />
          <MiscRecordCard
            title="Total Score Diff"
            record={records.score_diff.diff}
            footer={`${getTag(records.score_diff.highest_clan_id)} (${
              records.score_diff.highest_score
            }) - ${getTag(records.score_diff.lowest_clan_id)} (${
              records.score_diff.lowest_score
            })`}
          />
          <MiscRecordCard
            title="Shortest Match"
            record={records.min_duration.duration}
            footer={records.min_duration.match_id}
          />
        </>
      ) : (
        range(DEFAULT_RECORD_COUNT).map((index) => <RecordCard key={index} />)
      )}
    </RecordPanel>
  );
};
