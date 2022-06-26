import { FC } from "react";
import { LinkCell, LinkCellProps } from "./LinkCell";

export const MatchLinkCell: FC<Omit<LinkCellProps, "hrefPrefix">> = (props) => (
  <LinkCell {...props} hrefPrefix="matches" />
);
