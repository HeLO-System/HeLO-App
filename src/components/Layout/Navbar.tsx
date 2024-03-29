/* eslint-disable @next/next/no-img-element */
import { CustomLink } from "@components/CustomLink";
import { Searchbar } from "@components/Search";
import { SearchPanel } from "@components/Search/SearchPanel";
import { Navigation24Regular, Person24Filled } from "@fluentui/react-icons";
import classNames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";
import { useEventListener } from "usehooks-ts";
import Logo from "../../../public/helo.svg";
import GitHub from "../../../public/mark-github-16.svg";

const navElements: { text: string; href: string }[] = [
  { text: "Clans", href: "/clans" },
  { text: "Matches", href: "/matches" },
  { text: "Statistics", href: "/statistics" },
  { text: "About", href: "/about" },
  { text: "Tacmaps", href: "/tacmaps" },
];

export const NavBar: FC = () => {
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const { status, data } = useSession();

  const searchPanelKeyListener = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      e.stopPropagation();

      setSearchPanelOpen(!searchPanelOpen);
    }
  };

  useEventListener("keydown", searchPanelKeyListener);

  const close = (): void => {
    setNavPanelOpen(false);
  };

  return (
    <header
      className={classNames(
        "w-full glassmorphism",
        navPanelOpen ? "h-auto" : "h-14"
      )}
    >
      <div className="flex w-full items-center">
        <Link href="/">
          <a>
            <Logo className="fill-white h-14 w-auto p-2" />
          </a>
        </Link>
        {navElements.map((element) => (
          <CustomLink
            key={element.text}
            className="bg-transparent shadow-none hidden lg:block text-xl"
            {...element}
          />
        ))}
        {status === "authenticated" && data.user.isTeamManager && (
          <CustomLink
            className="bg-transparent shadow-none hidden lg:block text-xl"
            text="Report Match"
            href="/report-match"
          />
        )}
        <Searchbar
          className="ml-auto"
          onClick={(): void => {
            setSearchPanelOpen(!searchPanelOpen);
          }}
        />
        <Link href="https://ko-fi.com/helosystem">
          <a
            className="h-14 ml-2 hidden lg:flex items-center"
            target="_blank"
            rel="noreferrer"
            title="Support us"
          >
            <img src="/kofi.png" className="h-6" alt="KoFi" />
          </a>
        </Link>
        <Link href="https://github.com/helo-system/">
          <a
            className="h-14 w-12 p-3 hidden lg:block"
            target="_blank"
            rel="noreferrer"
          >
            <GitHub className="fill-white h-full w-auto" />
          </a>
        </Link>
        <button
          className="h-14 w-10 hidden lg:flex text-white justify-center items-center"
          type="button"
          onClick={() => {
            if (status === "authenticated") return signOut();
            return signIn("discord");
          }}
          title={status === "authenticated" ? "Sign out" : "Sign in"}
        >
          <Person24Filled className="h-8 w-8" />
        </button>

        <button
          onClick={(): void => setNavPanelOpen(!navPanelOpen)}
          className="h-14 block lg:hidden"
          type="button"
        >
          <Navigation24Regular className="text-white mr-2" />
        </button>
      </div>
      <hr
        className={classNames("h-0 border-e-2", navPanelOpen ? "" : "hidden")}
      />
      <ul className={navPanelOpen ? "" : "hidden"}>
        {navElements.map((element) => (
          <li key={element.text}>
            <CustomLink
              className="bg-transparent shadow-none !justify-start"
              onClick={close}
              {...element}
            />
          </li>
        ))}
        {status === "authenticated" && data.user.isTeamManager && (
          <li>
            <CustomLink
              className="bg-transparent shadow-none block !justify-start"
              text="Report Match"
              href="/report-match"
            />
          </li>
        )}
        <li className="flex">
          <Link href="https://ko-fi.com/helosystem">
            <a
              className="h-14 flex ml-auto items-center"
              target="_blank"
              rel="noreferrer"
            >
              <span className="my-auto text-white mr-2">Support us</span>
              <img src="/kofi.png" className="h-6" alt="KoFi" />
            </a>
          </Link>
          <Link href="https://github.com/helo-system/">
            <a className="h-14 w-14 p-2" target="_blank" rel="noreferrer">
              <GitHub className="fill-white h-full w-auto" />
            </a>
          </Link>

          <button
            className="h-14 w-10 flex text-white justify-center items-center"
            type="button"
            onClick={() => {
              if (status === "authenticated") return signOut();
              return signIn("discord");
            }}
            title={status === "authenticated" ? "Sign out" : "Sign in"}
          >
            <Person24Filled className="h-8 w-8" />
          </button>
        </li>
      </ul>
      <SearchPanel
        isOpen={searchPanelOpen}
        onRequestClose={(): void => {
          setSearchPanelOpen(false);
        }}
      />
    </header>
  );
};
