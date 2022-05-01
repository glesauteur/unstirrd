import React, { useState, useEffect } from "react";
import styled from "styled-components";

import MyCheckin from "../components/MyCheckin";

const MyCheckins = () => {
  const [myCheckins, setMyCheckins] = useState([
    {
      cocktail: [{ drinkName: "French Negroni", drinkCategory: "Cocktail" }],
      location: {
        fsq_id: "58c8b974951e7d7e08bc6fd8",
        categories: [{ name: "Lounge" }, { name: "Restaurant" }],
        location: {
          formatted_address:
            "4328 Saint-Laurent Blvd (Marie-Anne), Montréal QC H2W 1Z3",
        },
        name: "Coldroom",
      },
      rating: 4,
    },
    {
      cocktail: [{ drinkName: "Vieux Carre", drinkCategory: "Cocktail" }],
      location: {
        fsq_id: "58c8b974951e7d7e08bc6fd8",
        categories: [{ name: "Lounge" }, { name: "Bar" }],
        location: {
          formatted_address:
            "4328 Saint-Laurent Blvd (Marie-Anne), Montréal QC H2W 1Z3",
        },
        name: "Coldroom",
      },
      rating: 2,
    },
    {
      cocktail: [{ drinkName: "Old Fashioned", drinkCategory: "Cocktail" }],
      location: {
        fsq_id: "58c8b974951e7d7e08bc6fd8",
        categories: [{ name: "Restaurant" }, { name: "Bar" }],
        location: {
          formatted_address:
            "4328 Saint-Laurent Blvd (Marie-Anne), Montréal QC H2W 1Z3",
        },
        name: "Henrietta",
      },
      rating: 2,
    },
    {
      cocktail: [{ drinkName: "Last Word", drinkCategory: "Cocktail" }],
      location: {
        fsq_id: "58c8b974951e7d7e08bc6fd8",
        categories: [{ name: "Bar" }],
        location: {
          formatted_address:
            "4328 Saint-Laurent Blvd (Marie-Anne), Montréal QC H2W 1Z3",
        },
        name: "Siboire",
      },
      rating: 5,
    },
  ]);

  //   useEffect(() => {
  //     fetch(`/api/checkins`)
  //       .then((response) => response.json())
  //       .then((response) => setMyCheckins(response.checkins))
  //       .catch((err) => console.error(err));
  //   }, []);

  const allMyCheckins = myCheckins.map((myCheckin) => {
    return (
      <MyCheckin
        locationId={myCheckin.location.fsq_id}
        myCheckin={myCheckin}
      ></MyCheckin>
    );
  });

  //   useEffect(() => {
  //     fetch(`/api/checkins`)
  //       .then((response) => response.json())
  //       .then((response) => setMyCheckins(response.checkins))
  //       .catch((err) => console.error(err));
  //   }, []);

  return (
    <>
      <Container>{allMyCheckins}</Container>
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

export default MyCheckins;
