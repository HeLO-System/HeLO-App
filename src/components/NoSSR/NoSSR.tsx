import { FCC } from "@types";
import dynamic from "next/dynamic";

// eslint-disable-next-line react/jsx-no-useless-fragment
const NoSsr: FCC = ({ children }) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
