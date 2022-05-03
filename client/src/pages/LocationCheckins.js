import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

import LocationCheckin from "../components/LocationCheckin";
import { AiTwotoneExclamationCircle } from "react-icons/ai";

const LocationCheckins = () => {
  const [locationCheckins, setlocationCheckins] = useState([]);
  const [locationName, setLocationName] = useState("");

  let { locationId } = useParams();

  useEffect(() => {
    const findLocationCheckins = async function () {
      const response = await fetch(`/api/locations/${locationId}/checkins`);
      const data = await response.json();
      setlocationCheckins(data.locationCocktails);
    };

    const findLocationName = async function () {
      const response = await fetch(`/api/locations/${locationId}`);
      const data = await response.json();
      setLocationName(data.name);
    };

    findLocationName();
    findLocationCheckins();
  }, []);

  const allLocationCheckins = locationCheckins.map((locationCheckin) => {
    return (
      <LocationCheckin
        locationId={locationCheckin.locationFsId}
        locationCheckin={locationCheckin}
      ></LocationCheckin>
    );
  });

  console.log(allLocationCheckins);

  return (
    <>
      <Title>{locationName}'s reviews</Title>
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

const Title = styled.h2`
  color: white;
  text-align: center;
  padding-top: 20px;
  font-size: 25px;
  padding-bottom: 20px;
`;

export default LocationCheckins;
