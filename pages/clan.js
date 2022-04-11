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
    <div className="flex flex-col gap-20 p-5 h-screen justify-start">
      <div className="flex flex-row pl-10 w-fit h-fit rounded-2xl text-black gap-10 bg-gray-300">
        <div className="flex flex-col gap-10 px-5 pt-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png"
            alt=""
            className="mx-auto w-fit h-28 justify-start rounded-xl"
          ></img>
          <div className="flex flex-col gap-2 px-5 py-4">
            <p className="flex items-center justify-center font-mono text-2xl">
              Score
            </p>
            <p className="flex items-center justify-center font-bold text-4xl">
              752
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-10 px-5 pt-8 ">
          <div className="flex flex-col gap-2 h-28">
            <p className="flex items-center justify-center font-bold text-5xl">
              Corvus Rex
            </p>
            <p className="flex items-center justify-center font-mono text-3xl">
              CoRe
            </p>
          </div>

          <div className="flex flex-col gap-2 px-5 py-4">
            <p className="flex items-center justify-center font-mono text-2xl">
              Matches played
            </p>
            <p className="flex items-center justify-center font-bold text-4xl">
              38
            </p>
          </div>
        </div>
      </div>
      <div classname="flex bg-red-300">
        <h1 className="font-bold text-2xl pl-10 px-5">Players</h1>
        <div classname="flex flex-wrap">
          <p>Player 1</p>
          <p>Player 2</p>
          <p>Player 3</p>
        </div>
      </div>
    </div>
  );
}

export default clan;
