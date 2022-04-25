import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const LocationPage = () => {
  let { locationId } = useParams();

  const [location, setLocation] = useState(null);

  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: process.env.REACT_APP_FS_TOKEN,
  //     },
  //   };

  //   fetch(`https://api.foursquare.com/v3/places/${locationId}`, options)
  //     .then((response) => response.json())
  //     .then((response) => setLocation(response))
  //     .catch((err) => console.error(err));
  // }, []);

  // if (!location) {
  //   return <div>...</div>;
  // }

  // console.log(location);

  return (
    <Container>
      <LocationWrapper>
        <Name>Darling</Name>
        <Categories>Restaurant / Bar</Categories>
        <Address>1862 Blvd de Maisonneuve O, Montréal QC H3H 1J8</Address>
        <hr />
      </LocationWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LocationWrapper = styled.div`
  height: 500px;
  width: 500px;
  background-color: white;
  border-radius: 5px;
  padding: 0 15px;
  box-shadow: 3px 3px 3px lightgray;
`;

const Name = styled.h2`
  margin-top: 15px;
`;

const Categories = styled.div`
  margin-top: 5px;
  font-style: italic;
  font-size: 15px;
  font-weight: 900;
`;

const Address = styled.p`
  color: gray;
  margin-top: 5px;
  font-size: 15px;
`;

export default LocationPage;
