import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
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

//helper functions to concat strings
function clanSearchUrl(input) {
  return `/api/search?q=${input}&type=clan&limit=2`;
}
function matchSearchUrl(input) {
  return `/api/matches?match_id=${input}&limit=3&sort_by=date&desc=true`; //for now: limit to max. 2 matches
}

//search component for search page
export const Searchbar = ({ className }) => {
  const router = useRouter();
  const [, setSearchInput] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  //function to load clan and match options from API
  function loadOptions(input, callback) {
    const getClans = () =>
      axios.get(clanSearchUrl(input)).then(({ data }) =>
        data.map((i) => ({
          label: i.name || i.tag,
          value: i.tag,
          type: "clan",
        }))
      );
    const getMatches = () =>
      axios.get(matchSearchUrl(input)).then(({ data }) =>
        data.map((i) => ({
          label: i.match_id,
          value: i.match_id,
          type: "match",
        }))
      );

    Promise.all([getClans(), getMatches()]).then((data) => {
      const clanOptions = data
        .flat(1)
        .filter((object) => object.type == "clan");
      const matchOptions = data
        .flat(1)
        .filter((object) => object.type == "match");
      const options = [
        {
          label: "Clans",
          options: clanOptions,
        },
        {
          label: "Matches",
          options: matchOptions,
        },
      ];

      callback(options);
    });
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
    <AsyncSelect
      value={selectedValue}
      placeholder={"Search"}
      onInputChange={(e) => {
        setSearchInput(e);
      }}
      loadOptions={loadOptions}
      onChange={selectRedirect}
      styles={searchBarStyles}
      noOptionsMessage={() => "No matches"}
      className={className}
    />
  );
};
