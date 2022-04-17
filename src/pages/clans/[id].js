import { ChatIcon } from "@heroicons/react/solid";
import React from "react";

function clan() {
  /*clan information needed:
  -tag
  -name
  -icon/flag
  -discord link
  -score
  -matches played
  -players (with roles)
  -recent matches

  
  */

  return (
    <>
      <Head>
        <title> {`HeLO | ${""}`}</title>
        <meta
          property="og:image"
          content="http://localhost:3000/api/og-image?name=Sto%C3%9Ftrupp_Donnerbalken&score=1000&tag=StdB&num_matches=10"
        />
      </Head>
      <div className="flex flex-col gap-5 py-16 pr-5 h-screen justify-start bg-gray-900 ">
        <div className="flex flex-row pl-10 pr-5 w-fill h-fit rounded-r-2xl gap-5 bg-black shadow-xl shadow-black justify-start items-center text-white">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png"
            alt=""
            className="w-48 h-40 justify-start rounded-xl m-10 shadow-2xl shadow-red-400"
          ></img>
          <div className="flex flex-col gap-2 h-28 m-10 justify-center">
            <p className="flex items-center justify-center font-bold text-8xl">
              Corvus Rex
            </p>
            <p className="flex items-center justify-center font-mono text-5xl">
              CoRe
            </p>
          </div>
          <div className="flex flex-col gap-2 ml-20 px-20 py-4">
            <p className="flex items-center justify-center font-mono text-2xl">
              Score
            </p>
            <p className="flex items-center justify-center font-bold text-5xl">
              752
            </p>
          </div>

          <div className="flex flex-col gap-2 px-5 py-4 mr-auto">
            <p className="flex items-center justify-center font-mono text-2xl">
              Matches played
            </p>
            <p className="flex items-center justify-center font-bold text-5xl">
              38
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <p className="flex items-center justify-center font-semibold">
              Discord
            </p>
            <button className="flex justify-center-items-center">
              <ChatIcon className="w-4 hover:scale-125" />
            </button>
          </div>
        </div>

        <div className="flex flex-col w-fill h-fit bg-black shadow-xl shadow-black text-white pl-20 pt-5 pb-10 rounded-r-2xl gap-5">
          <p className="font-bold text-4xl">Recent matches</p>
          <div className="flex flex-row gap-8">
            <div className="flex flex-col overflow-hidden items-center justify-center bg-gray-900 h-40 w-72 rounded-xl pt-2 px-3 text-gray-300">
              <div className="flex flex-col bg-green-800 w-72 h-fit mb-2">
                <p className="flex items-center justify-center font-semibold text-lg">
                  WIN
                </p>
              </div>
              <p className="text-2xl items-center justify-center">
                <span className="font-bold text-white items-start">
                  ClanTag1
                </span>{" "}
                : ClanTag2
              </p>
              <p className=" items-center justify-center text-2xl font-mono">
                <span className="font-bold text-white">5 </span>: 0
              </p>
              <p className="text-md font-italic">eventtag</p>
              <p className="text-md text-gray-400">22.03.2022</p>
            </div>
            <div className="flex flex-col overflow-hidden items-center justify-center bg-gray-900 h-40 w-72 rounded-xl pt-2 px-3 text-gray-300">
              <div className="flex flex-col bg-red-800 w-72 h-fit mb-2">
                <p className="flex items-center justify-center font-semibold text-lg">
                  LOSS
                </p>
              </div>
              <p className="text-2xl items-center justify-center">
                <span className="font-bold text-white items-start">
                  ClanTag1
                </span>{" "}
                : ClanTag2
              </p>
              <p className=" items-center justify-center text-2xl font-mono">
                <span className="font-bold text-white">2 </span>: 3
              </p>
              <p className="text-md font-italic">eventtag</p>
              <p className="text-md text-gray-400">22.03.2022</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default clan;
