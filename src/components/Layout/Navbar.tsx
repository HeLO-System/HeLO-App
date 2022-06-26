/* eslint-disable @next/next/no-img-element */
import { CustomLink } from "@components/CustomLink";
import { Navigation24Regular } from "@fluentui/react-icons";
import classNames from "classnames";
import Link from "next/link";
import { FC, useState } from "react";
import Logo from "../../../public/helo.svg";
import GitHub from "../../../public/mark-github-16.svg";

export const NavBar: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={classNames("w-full glassmorphism", open ? "h-auto" : "h-10")}
    >
      <div className="flex w-full">
        <Link href="/">
          <a>
            <Logo className="fill-white h-10 w-auto p-2" />
          </a>
        </Link>
        <CustomLink
          text="Clans"
          href="/clans"
          className="bg-transparent shadow-none hidden md:block"
        ></CustomLink>
        <CustomLink
          text="Matches"
          href="/matches"
          className="bg-transparent shadow-none  hidden md:block"
        ></CustomLink>
        <CustomLink
          text="Statistics"
          href="/statistics"
          className="bg-transparent shadow-none  hidden md:block"
        ></CustomLink>
        <CustomLink
          text="About"
          href="/about"
          className="bg-transparent shadow-none  hidden md:block"
        ></CustomLink>
        <Link href="https://ko-fi.com/helosystem">
          <a
            className="h-10 ml-auto hidden md:flex items-center"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/kofi.png" className="h-6" alt="KoFi" />
          </a>
        </Link>
        <Link href="https://github.com/helo-system/">
          <a
            className="h-10 w-10 p-2 hidden md:block"
            target="_blank"
            rel="noreferrer"
          >
            <GitHub className="fill-white h-full w-auto" />
          </a>
        </Link>
        <button
          onClick={(): void => setOpen(!open)}
          className="h-10 block md:hidden ml-auto"
        >
          <Navigation24Regular className="text-white mr-2" />
        </button>
      </div>
      <hr className={classNames("h-0 border-e-2", open ? "" : "hidden")} />
      <ul className={open ? "" : "hidden"}>
        <li>
          <CustomLink
            text="Clans"
            href="/clans"
            className="bg-transparent shadow-none !justify-start"
          ></CustomLink>
        </li>
        <li>
          <CustomLink
            text="Matches"
            href="/matches"
            className="bg-transparent shadow-none !justify-start"
          ></CustomLink>
        </li>{" "}
        <li>
          <CustomLink
            text="Statistics"
            href="/statistics"
            className="bg-transparent shadow-none !justify-start"
          ></CustomLink>
        </li>
        <li>
          <CustomLink
            text="About"
            href="/about"
            className="bg-transparent shadow-none !justify-start"
          ></CustomLink>
        </li>
        <li className="flex">
          <Link href="https://ko-fi.com/helosystem">
            <a
              className="h-10 flex ml-auto items-center"
              target="_blank"
              rel="noreferrer"
            >
              <span className="my-auto text-white mr-2">Support us</span>
              <img src="/kofi.png" className="h-6" alt="KoFi" />
            </a>
          </Link>
          <Link href="https://github.com/helo-system/">
            <a className="h-10 w-10 p-2" target="_blank" rel="noreferrer">
              <GitHub className="fill-white h-full w-auto" />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
