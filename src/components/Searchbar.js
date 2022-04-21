import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

const searchBarStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    fontFamily: "Gotham-Book",
    opacity: isFocused ? 1 : 0.6,
    backgroundColor: "white",
    fontSize: 14,
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: "Gotham-Book",
    fontSize: 12,
    //maybe visual identification of match vs. clan
  }),
};

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
    return "api/matches?match_id=" + input + "&limit=3&sort_by=date&desc=true"; //for now: limit to max. 2 matches
    //no sorting yet
  }

  //function to load clan and match options from API
  async function loadOptions(input, callback) {
    const resClan = await fetchData(clanSearchUrl(input));
    const resMatch = await fetchData(matchSearchUrl(input));

    const clanoptions = resClan.map((i) => ({
      label: i.name,
      value: i.tag,
      type: "clan",
    }));
    const matchoptions = resMatch.map((i) => ({
      label: i.match_id,
      value: i.match_id,
      type: "match",
    }));

    callback([].concat(clanoptions, matchoptions));
  }

  //route to detail page of search selection
  function selectRedirect(value) {
    setSelectedValue(value);
    if (value.type == "clan") {
      router.push(`/clans/${value.value}`).catch(null);
    } else if (value.type == "match") {
      router.push(`/match/${value.value}`).catch(null);
    }
  }

  return (
    <div className="flex items-center justify-center h-fit">
      <div className="w-64 ">
        <AsyncSelect
          value={selectedValue}
          placeholder={"Search for clans, matches"}
          onInputChange={(e) => {
            setSearchInput(e);
            console.log("typed in: ", e);
          }}
          loadOptions={loadOptions}
          onChange={selectRedirect}
          styles={searchBarStyles}
        />
      </div>
    </div>
  );
}

export default Searchbar;
