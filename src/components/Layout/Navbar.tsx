/* eslint-disable @next/next/no-img-element */
import { CustomLink } from "@components/CustomLink";
import { Searchbar } from "@components/Search";
import { SearchPanel } from "@components/Search/SearchPanel";
import { Navigation24Regular } from "@fluentui/react-icons";
import { EventListener, useEventListener } from "@hooks";
import classNames from "classnames";
import Link from "next/link";
import { FC, useCallback, useState } from "react";
import Logo from "../../../public/helo.svg";
import GitHub from "../../../public/mark-github-16.svg";

const navElements: { text: string; href: string }[] = [
  { text: "Clans", href: "/clans" },
  { text: "Matches", href: "/matches" },
  { text: "Statistics", href: "/statistics" },
  { text: "About", href: "/about" },
];

export const NavBar: FC = () => {
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);

  const searchPanelKeyListener: EventListener<"keydown"> = useCallback(
    (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        e.stopPropagation();

        setSearchPanelOpen(!searchPanelOpen);
      }
    },
    [searchPanelOpen]
  );

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
        {navElements.map((element, index) => (
          <CustomLink
            key={index}
            className="bg-transparent shadow-none hidden md:block text-xl"
            {...element}
          />
        ))}
        <Searchbar
          className="ml-auto"
          onClick={(): void => {
            setSearchPanelOpen(!searchPanelOpen);
          }}
        />
        <Link href="https://ko-fi.com/helosystem">
          <a
            className="h-14 ml-2 hidden md:flex items-center"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/kofi.png" className="h-6" alt="KoFi" />
          </a>
        </Link>
        <Link href="https://github.com/helo-system/">
          <a
            className="h-14 w-14 p-3 hidden md:block"
            target="_blank"
            rel="noreferrer"
          >
            <GitHub className="fill-white h-full w-auto" />
          </a>
        </Link>
        <button
          onClick={(): void => setNavPanelOpen(!navPanelOpen)}
          className="h-14 block md:hidden"
        >
          <Navigation24Regular className="text-white mr-2" />
        </button>
      </div>
      <hr
        className={classNames("h-0 border-e-2", navPanelOpen ? "" : "hidden")}
      />
      <ul className={navPanelOpen ? "" : "hidden"}>
        {navElements.map((element, index) => (
          <li key={index}>
            <CustomLink
              className="bg-transparent shadow-none !justify-start"
              onClick={close}
              {...element}
            />
          </li>
        ))}
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
        </li>
      </ul>
      <SearchPanel
        isOpen={searchPanelOpen}
        onRequestClose={(): void => {
          console.log("test");
          setSearchPanelOpen(false);
        }}
      />
    </header>
  );
};
