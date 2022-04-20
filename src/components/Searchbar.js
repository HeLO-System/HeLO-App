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

  //helper function to concat strings to api path
  function clanSearchUrl(input) {
    const str = "/api/search?q=" + input + "&type=clan&limit=2";
    return str;
  }

  //function to load clan options from API
  async function loadOptions(input, callback) {
    const res = await fetchData(clanSearchUrl(input));
    callback(res.map((i) => ({ label: i.name, value: i.tag })));
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
