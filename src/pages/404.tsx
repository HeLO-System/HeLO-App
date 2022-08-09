/* eslint-disable @next/next/no-img-element */
import { CustomLink } from "@components/CustomLink";
import { ArrowLeft24Regular, Home24Filled } from "@fluentui/react-icons";
import classNames from "classnames";
import { FC } from "react";

const NotFound: FC = () => (
  <div className="flex flex-col gap-4 text-white h-full items-center justify-center">
    <h1 className="text-7xl">404</h1>
    <h2 className="text-3xl">This page does not exist</h2>
    <div className="flex gap-4">
      <CustomLink
        className={classNames(
          "w-min text-xl font-gotham-book whitespace-nowrap"
        )}
        icon={<Home24Filled />}
        text="Home"
        href="/"
      />
      <button
        className="bg-e-2 p-2 rounded-lg shadow-elevation-1 text-font flex justify-center items-center gap-2 hover:scale-105"
        onClick={(): void => {
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          window.history.go(-2);
        }}
        type="button"
      >
        <ArrowLeft24Regular />
        <span className="text-xl font-gotham-book whitespace-nowrap">Back</span>
      </button>
    </div>
  </div>
);

export default NotFound;
