import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

const searchBarStyles = {
  control: (provided) => ({
    ...provided,
    fontFamily: "Gotham-Book",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    fontSize: 16,
    border: "0px",
    borderRadius: "8px",
    padding: "4px",
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: "Gotham-Book",
    fontSize: 14,
    color: "black",
  }),
  menu: (styles) => ({
    ...styles,
    border: "0px",
    borderRadius: "8px",
  }),
  input: (provided) => ({
    ...provided,
    color: "white",
  }),
  placeholder: (provided, { isFocused }) => ({
    ...provided,
    color: isFocused ? "gray" : "white",
  }),
};

//search component for search page
export const Searchbar = () => {
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
      //disabled for now, no match pages yet
      //router.push(`/match/${value.value}`).catch(null);
    }
  }

  return (
    <div className="w-80 rounded-lg lg:bg-e-2 bg-e-1-dark shadow-elevation-1 text-font">
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
        noOptionsMessage={() => "No matches"}
      />
    </div>
  );
}

export default Searchbar;
