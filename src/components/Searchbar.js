import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

//search component for search page
function Searchbar() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  //helper function to fetch from api
  function fetchData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            reject(res);
          }
          resolve(res.json());
        })
        .catch(reject);
    });
  }

  //helper functions to concat strings
  function clanSearchUrl(input) {
    return "/api/search?q=" + input + "&type=clan&limit=2";
  }
  function matchSearchUrl(input) {
    return "api/search?q=" + input + "&type=match&limit=2"; //for now: limit to max. 2 matches
  }

  //function to load clan and match options from API
  async function loadOptions(input, callback) {
    const resClan = await fetchData(clanSearchUrl(input));
    const resMatch = await fetchData(matchSearchUrl(input));

    const clanoptions = resClan.map((i) => ({ label: i.name, value: i.tag }));
    const matchoptions = resMatch.map((i) => ({
      label: i.match_id,
      value: i.match_id,
    }));

    callback([].concat(clanoptions, matchoptions));
  }

  //route to detail page of search selection
  function selectRedirect(value) {
    setSelectedValue(value);
    router.push(`/clans/${value.value}`).catch(null);
  }

  return (
    <div className="flex items-center justify-center h-fit">
      <div className="w-64">
        <AsyncSelect
          value={selectedValue}
          placeholder={"Search for clans"}
          onInputChange={(e) => {
            setSearchInput(e);
            console.log("typed in: ", e);
          }}
          loadOptions={loadOptions}
          onChange={selectRedirect}
        />
      </div>
    </div>
  );
}

export default Searchbar;
