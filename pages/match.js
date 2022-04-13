import React from "react";

function match() {
  /*information to be displayed:
    -clan 1 vs clan2
    -result
    -player count for both sides
    -map
    -fractions
    -duration
    -date of match
    -event type
    -competitive factor/match type
    
    */

  return (
    <div>
      <div className="flex flex-col h-full w-full bg-gray-400 py-5 gap-5">
        <div className="flex flex-col">
          <p className="flex justify-center text-lg font-semibold">
            HLL Premier League
          </p>
          <p className="flex justify-center text-lg">(HPL)</p>
        </div>
        <div className="flex text-6xl font-bold flex-row justify-center items-center gap-10">
          <p className="flex justify-center items-center">ClanTag1</p>
          <p className="flex justify-center items-center"> : </p>
          <p className="flex justify-center items-center">ClanTag2</p>
        </div>
        <div className="flex text-8xl font-bold flex-row justify-center items-center gap-10">
          <p className="flex justify-center items-center">3</p>
          <p className="flex justify-center items-center"> : </p>
          <p className="flex justify-center items-center">2</p>
        </div>
        <div className="flex flex-row p-2 gap-5">
          <div className="flex flex-row w-full h-32 bg-gray-500 gap-2">
            <div className="bg-black w-full h-32 bg-opacity-50"></div>
            <div className="bg-black w-full h-32 bg-opacity-50"></div>
            <div className="bg-black w-full h-32 bg-opacity-50"></div>
          </div>
          <div className="flex w-full h-32 bg-gray-600">
            <div className="flex flex-row w-full h-32 bg-gray-500 gap-2">
              <div className="bg-black w-full h-32 bg-opacity-50"></div>
              <div className="bg-black w-full h-32 bg-opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default match;
