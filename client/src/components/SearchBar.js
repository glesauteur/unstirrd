import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Location from "./Location";
import Cocktail from "./Cocktail";

import { debounce } from "../utils";

import { AuthContext } from "../auth/AuthContext";

const SearchBar = () => {
  const { latLong, setLatLong } = React.useContext(AuthContext);
  const [searchResults, setSearchResults] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [input, setInput] = useState(false);
  const [title, setTitle] = useState("Where do you want to go out?");
  const [subtitle, setSubtitle] = useState("Looking for a cocktail?");

  const handleClick = (e) => {
    if (e.target.localName === "input") {
      setInput(true);
    } else {
      setInput(false);
    }
  };

  const handleSwitchSearch = () => {
    if (title === "Where do you want to go out?") {
      setSearchResults(null);
      setTitle("What do you want to drink?");
      setSubtitle("Looking for a place to go?");
    } else if (title === "What do you want to drink?") {
      setSearchResults(null);
      setTitle("Where do you want to go out?");
      setSubtitle("Looking for a cocktail?");
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

    const findLocationsOrCocktails = async function () {
      if (title === "Where do you want to go out?") {
        const response = await fetch(
          `/api/locations/search?q=${searchValue}&lat=${latLong.lat}&long=${latLong.long}`
        );
        const data = await response.json();

        setSearchResults(
          data.results.filter((result) => {
            return result.place.categories.some((category) => {
              return category.id >= 13000 && category.id < 14000;
            });
          })
        );
      } else if (title === "What do you want to drink?") {
        const response = await fetch(`/api/cocktails?q=${searchValue}`);
        const data = await response.json();
        setSearchResults(data.cocktails);
      }
    };
    findLocationsOrCocktails();
  }, [searchValue]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.error("error");
    }

    function showPosition(position) {
      setLatLong({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    }
  }, []);

  let bars;
  let cocktailList;

  if (searchResults) {
    if (title === "Where do you want to go out?") {
      bars = searchResults.map((location) => {
        return (
          <Location key={location.place.fsq_id} location={location}></Location>
        );
      });
    } else if (title === "What do you want to drink?") {
      cocktailList = searchResults.map((cocktail) => {
        return <Cocktail key={cocktail._id} cocktail={cocktail}></Cocktail>;
      });
    }
  }

  return (
    <SearchContainer onClick={handleClick}>
      <Title>{title}</Title>
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
            <Input
              placeholder="Enter a minimum of 3 letters"
              onChange={debounce(handleChange, 1000)}
            ></Input>
          </div>
        </InputContainer>
        <Dropdown>
          {title === "Where do you want to go out?" && (
            <BarsContainer>{input && <div>{bars}</div>}</BarsContainer>
          )}
          {title === "What do you want to drink?" && (
            <CocktailsContainer>
              {input && <div>{cocktailList}</div>}
            </CocktailsContainer>
          )}
        </Dropdown>
        <CocktailSearch onClick={handleSwitchSearch}>{subtitle}</CocktailSearch>
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
  text-align: center;
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
  width: ${(props) => (props.input ? "450px" : "350px")};
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
  color: #043132;
  ::placeholder {
    color: #cdcdd2;
    font-size: 18px;
  }
  :focus {
    outline: none;
  }
`;

const CocktailSearch = styled.p`
  color: #043132;
  text-align: center;
  margin-top: 12px;
  font-style: italic;

  :hover {
    cursor: pointer;
    font-weight: 900;
  }
`;

// const Cocktail = styled.div`
//   border-bottom-left-radius: 10px;
//   border-bottom-right-radius: 10px;
//   padding: 8px;
//   cursor: pointer;
//   :hover {
//     background-color: #f3f3f3;
//   }
// `;

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

const CocktailsContainer = styled.div`
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 6px 6px 6px lightgray;
  transition: 0.2s;
`;

export default SearchBar;
