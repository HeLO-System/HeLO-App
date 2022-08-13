import { Grid } from "@chakra-ui/react";
import { useClanTags } from "@hooks";
import classNames from "classnames";
import { FC } from "react";

type ClanStackProps = {
  clanIds: string[];
  playerDist: number[];
  reverse?: boolean;
};

export const ClanStack: FC<ClanStackProps> = ({
  clanIds,
  playerDist: players,
  reverse,
}) => {
  const { getTag } = useClanTags();

  return (
    <Grid
      templateColumns="repeat(3,min-content)"
      className={classNames("text-xl h-20 items-center", {
        "justify-end": reverse,
      })}
    >
      {clanIds.map((clanId, index) => (
        <>
          {reverse && (
            <>
              <span key={`${clanId}.scoreChange`} className="mr-4">
                ±0
              </span>
              <span key={`${clanId}.players`} className="mx-4">
                {`(${players[index]})`}
              </span>
            </>
          )}
          <span className="whitespace-nowrap" key={`${clanId}.name`}>
            {getTag(clanId)}
          </span>
          {reverse || (
            <>
              <span key={`${clanId}.players`} className="mx-4">
                {`(${players[index]})`}
              </span>
              <span key={`${clanId}.scoreChange`}>±0</span>
            </>
          )}
        </>
      ))}
    </Grid>
  );
};
