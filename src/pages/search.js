import Searchbar from "@components/Searchbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

function Search() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Searchbar />
    </div>
  );
}

export default Search;
