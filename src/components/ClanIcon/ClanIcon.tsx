import classNames from "classnames";
import Image, { ImageProps } from "next/image";
import { FC } from "react";
import Logo from "../../../public/helo.svg";

interface ClanIconProps {
  icon?: string;
  imageProps?: Partial<ImageProps>;
  logoClassName?: string;
}

export const ClanIcon: FC<ClanIconProps> = ({
  icon,
  imageProps,
  logoClassName,
}) =>
  icon ? (
    <Image src={icon} alt="Clan Logo" objectFit="contain" {...imageProps} />
  ) : (
    <Logo className={classNames("w-full h-full", logoClassName)} />
  );
