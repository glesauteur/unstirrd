import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import CocktailCheckin from "../components/CocktailCheckin";

const CocktailCheckins = () => {
  const [cocktailCheckins, setCocktailCheckins] = useState(null);
  const [cocktailName, setCocktailName] = useState(null);

  let { cocktailId } = useParams();

  useEffect(() => {
    const findCocktailCheckins = async function () {
      const response = await fetch(`/api/cocktails/${cocktailId}`);
      const data = await response.json();
      setCocktailCheckins(data.checkins);
    };
    const findCocktailName = async function () {
      const response = await fetch(`/api/cocktails/${cocktailId}`);
      const data = await response.json();
      setCocktailName(data.cocktail.drinkName);
    };

    findCocktailName();
    findCocktailCheckins();
  }, []);

  if (!cocktailCheckins || !cocktailName) {
    return (
      <Loading>
        <img src="/loading.svg" alt="loading-spinner" />
      </Loading>
    );
  }

  const allCocktailCheckins = cocktailCheckins.map((cocktailCheckin) => {
    return (
      <CocktailCheckin
        cocktailId={cocktailCheckin.cocktailId}
        cocktailCheckin={cocktailCheckin}
      ></CocktailCheckin>
    );
  });

  return (
    <>
      <Title>{cocktailName}'s reviews</Title>
      <Container>{allCocktailCheckins}</Container>
    </>
  );
};

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin-top: 25vh;
`;

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

export default CocktailCheckins;
