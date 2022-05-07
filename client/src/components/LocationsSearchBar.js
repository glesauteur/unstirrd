import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { debounce } from "../utils";

const LocationsSearchBar = ({ setLocation }) => {
  const [searchValue, setSearchValue] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    const findLocations = async function () {
      const response = await fetch(`/api/locations/search?q=${searchValue}`);
      const data = await response.json();

      setSearchResults(
        data.results.filter((result) => {
          return result.place.categories.some((category) => {
            return category.id >= 13000 && category.id < 14000;
          });
        })
      );
    };
    findLocations();
  }, [searchValue]);

  let locationList;

  if (searchResults) {
    locationList = searchResults.map((location) => {
      return (
        <Location
          key={location.place.fsq_id}
          onClick={() => {
            setInput(location.place.name);
            setLocation(location.place.fsq_id);
          }}
          key={location.place.fsq_id}
        >
          {location.place.name}
        </Location>
      );
    });
  }

  const handleClick = (e) => {
    if (e.target.localName === "input") {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  };

  const handleSearchTerms = debounce((e) => {
    const val = e.target.value;

    if (val.length < 3) {
      setSearchValue(null);
      setSearchResults(null);
    } else {
      setSearchValue(val);
    }
  }, 500);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
  };

  console.log(searchValue);

  return (
    <>
      <SearchContainer onClick={handleClick}>
        <div>
          <InputContainer input={input}>
            <div
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              <FontAwesomeIcon
                style={{
                  color: "#CDCDD2",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  width: "50%",
                }}
                icon={faMagnifyingGlass}
              />
            </div>
            <div style={{ display: "inline-block", width: "100%" }}>
              <Input
                placeholder="Enter a minimum of 3 letters"
                isFocused={isFocused}
                onChange={(e) => {
                  handleInputChange(e);
                  handleSearchTerms(e);
                }}
              ></Input>
            </div>
          </InputContainer>
          <Dropdown>
            {isFocused && (
              <LocationsContainer>{locationList}</LocationsContainer>
            )}
          </Dropdown>
        </div>
      </SearchContainer>
    </>
  );
};

const SearchContainer = styled.div`
  margin-top: 15px;
`;

const InputContainer = styled.div`
  border-style: none;
  font-size: 25px;
  border-radius: 10px;
  background-color: white;
  border-style: solid;
  border-width: 0.2px;
  border-color: lightgray;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  border-style: none;
  font-size: 25px;
  border-radius: 10px;
  background-color: transparent;
  width: 90%;
  color: #043132;
  font-size: 22px;
  color: #043132;
  ::placeholder {
    color: #cdcdd2;
    font-size: 16px;
  }
  :focus {
    outline: none;
  }
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Location = styled.div`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 8px;
  cursor: pointer;
  :hover {
    background-color: #f3f3f3;
  }
`;

const LocationsContainer = styled.div`
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 6px 6px 6px lightgray;
  transition: 0.2s;
`;

export default LocationsSearchBar;
