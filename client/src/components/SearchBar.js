import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Location from "./Location";

import { debounce } from "../utils";

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [input, setInput] = useState(false);

  const handleClick = (e) => {
    if (e.target.localName === "input") {
      setInput(true);
    } else {
      setInput(false);
    }
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;

    if (searchValue.length < 3) {
      setSearchValue(null);
      setSearchResults(null);
    } else {
      setSearchValue(searchValue);
    }
  };

  useEffect(() => {
    if (searchValue === null) return;

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: process.env.REACT_APP_FS_TOKEN,
      },
    };

    // TODO: Get user location
    fetch(
      `https://api.foursquare.com/v3/autocomplete?query=${searchValue}&ll=45.50%2C-73.56&radius=10000&limit=30&types=place`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setSearchResults(
          response.results.filter((result) => {
            return result.place.categories.some((category) => {
              return category.id >= 13000 && category.id < 14000;
            });
          })
        )
      )
      .catch((err) => console.error(err));
  }, [searchValue]);

  let bars;

  if (searchResults) {
    bars = searchResults.map((location) => {
      return (
        <Location key={location.place.fsq_id} location={location}></Location>
      );
    });
  }

  return (
    <SearchContainer onClick={handleClick}>
      <Title>Where are you?</Title>
      <div>
        <InputContainer input={input} searchResults={searchResults}>
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
              }}
              icon={faMagnifyingGlass}
            />
          </div>
          <div style={{ display: "inline-block", width: "100%" }}>
            <Input onChange={debounce(handleChange, 1000)}></Input>
          </div>
        </InputContainer>
        <Dropdown>
          <BarsContainer>{input && <div>{bars}</div>}</BarsContainer>
        </Dropdown>
      </div>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px;
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  border-style: none;
  font-size: 25px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: white;
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: ${(props) => (props.input ? "6px 9px 6px lightgray" : "none")};
  transition: ${(props) => (props.input ? "0.2s" : "0.2s")};
  width: ${(props) => (props.input ? "450px" : "400px")};
  height: ${(props) => (props.input ? "56px" : "50px")};
  border-bottom-left-radius: ${(props) =>
    props.searchResults ? "0px" : "10px"};
  border-bottom-right-radius: ${(props) =>
    props.searchResults ? "0px" : "10px"};
  border-bottom-style: ${(props) => (props.searchResults ? "solid" : "none")};
  border-bottom-color: ${(props) =>
    props.searchResults ? "lightgray" : "none"};
  border-bottom-width: ${(props) => (props.searchResults ? "1px" : "0px")};
`;

const Input = styled.input`
  border-style: none;
  font-size: 25px;
  border-radius: 10px;
  background-color: transparent;
  width: 90%;
  margin-left:

  color: #cdcdd2;
  :focus {
    outline: none;
  }
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const BarsContainer = styled.div`
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 6px 6px 6px lightgray;
  transition: 0.2s;
`;

export default SearchBar;
