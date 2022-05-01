import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

import LocationCheckin from "../components/LocationCheckin";

const LocationCheckins = () => {
  const [locationCheckins, setlocationCheckins] = useState([]);

  let { locationId } = useParams();

  useEffect(() => {
    const findLocationCheckins = async function () {
      const response = await fetch(`/api/locations/${locationId}/checkins`);
      const data = await response.json();
      setlocationCheckins(data.locationCocktails);
    };

    findLocationCheckins();
  }, []);

  console.log(locationCheckins);
  // if (!locationCheckins) {
  //   return <div>loading..</div>;
  // }

  const allLocationCheckins = locationCheckins.map((locationCheckin) => {
    return (
      <LocationCheckin
        locationId={locationId}
        locationCheckin={locationCheckin}
      ></LocationCheckin>
    );
  });

  return (
    <>
      <p>location reviews</p>
      <Container>{allLocationCheckins}</Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;

  :last-child {
    margin-bottom: 30px;
  }
`;

export default LocationCheckins;
