import { FC } from "react";
import { LinkCell, LinkCellProps } from "./LinkCell";

export const ClanLinkCell: FC<Omit<LinkCellProps, "hrefPrefix">> = (props) => (
  <LinkCell {...props} hrefPrefix="clans" />
);
