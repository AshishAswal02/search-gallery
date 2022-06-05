import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [lookupItem, setLookupItem] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  //set the search param on click of search
  const handleSearch = () => {
    setSearchParams({ search: lookupItem });
  };

  return (
    <InputGroup
      className="w-50 my-2 m-auto"
      value={lookupItem}
      onChange={(e) => setLookupItem(e.target.value)}
    >
      <FormControl placeholder="e.g. dogs" />
      <Button className={ lookupItem.length > 0 ? 'mx-1' : 'disabled mx-1' } onClick={handleSearch}>
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchBar;
