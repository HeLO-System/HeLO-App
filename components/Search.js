import React from "react";

//search component for search page
function Search() {
  return (
    <div className="flex justify-start h-80 items-center p-20 bg-black">
      <div className="relative w-full max-w-lg">
        <div className="absolute -top-40 -left-4 w-96 h-96 rounded-full opacity-100 bg-red-400 filter blur-2xl mix-blend-normal animate-blob"></div>
        <div className="absolute -top-40 -right-4 w-96 h-96 rounded-full opacity-50 bg-cyan-300 filter blur-2xl mix-blend-normal animate-blob animation-delay-2000"></div>
        <div className="absolute -top-32 left-24 w-80 h-80 rounded-full opacity-50 bg-pink-300 filter blur-2xl  mix-blend-normal animate-blob animation-delay-5000"></div>
        <div className="relative flex flex-col gap-10 justify-center items-center">
          <h1 className="font-bold text-8xl">HeLO</h1>
          <div class="flex items-center justify-start">
            <div class="flex rounded-xl border-2 bg-white">
              <button class="flex items-center justify-center rounded-xl px-4 hover:scale-110">
                <svg
                  class="h-10 w-10 text-gray-700"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
                </svg>
              </button>
              <input
                type="text"
                class="w-80 rounded-xl px-4 py-2 focus:outline-none bg-white"
                placeholder="Search for clans, matches, players"
                onChange={(e) => {
                  console.log("typed in: ", e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
