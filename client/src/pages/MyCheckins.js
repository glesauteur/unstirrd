import React, { useState, useEffect } from "react";
import styled from "styled-components";

import MyCheckin from "../components/MyCheckin";

const MyCheckins = () => {
  const [myCheckins, setMyCheckins] = useState([
    {
      cocktail: [{ drinkName: "French Negroni", drinkCategory: "Cocktail" }],
      location: {
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
    return <MyCheckin myCheckin={myCheckin}></MyCheckin>;
  });

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
  height: 100vh;
  flex-direction: column;
  gap: 30px;
  margin-top: 15px;
`;

export default MyCheckins;
