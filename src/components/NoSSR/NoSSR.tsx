import dynamic from "next/dynamic";
import { FC, Fragment, ReactNode } from "react";

const NoSsr: FC<{ children: ReactNode }> = ({ children }) => (
  <Fragment>{children}</Fragment>
);

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
