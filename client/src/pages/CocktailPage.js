import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const CocktailPage = () => {
  let { cocktailId } = useParams();

  const [numberOfCheckins, setNumberOfCheckins] = useState(0);
  const [cocktail, setCocktail] = useState(null);
  const [cocktailAverageRating, setCocktailAverageRating] = useState(0);

  const navigate = useNavigate();

  const handleCheckin = () => {
    navigate(`/checkin/cocktail/${cocktailId}`);
  };

  const handleClick = () => {
    navigate(`/cocktail/${cocktailId}/checkins`);
  };

  useEffect(() => {
    const findCocktailNumOfCheckins = async function () {
      const response = await fetch(`/api/cocktails/${cocktailId}`);
      const data = await response.json();
      setNumberOfCheckins(data.totalCheckins);
    };

    const findCocktailRatings = async function () {
      const response = await fetch(`/api/cocktails/${cocktailId}`);
      const data = await response.json();
      setCocktailAverageRating(data.averageRating);
    };
    const findCocktailInfo = async function () {
      const response = await fetch(`/api/cocktails/${cocktailId}`);
      const data = await response.json();
      setCocktail(data.cocktail);
    };

    findCocktailInfo();
    findCocktailNumOfCheckins();
    findCocktailRatings();
  }, []);

  if (!cocktail) {
    return <div>...loading</div>;
  }

  let ingredientAndMesure = [];

  let mesure = cocktail.mesure;

  const allIngredients = cocktail.ingredients.forEach((ingredient, index) => {
    ingredientAndMesure.push(ingredient + ":" + " " + mesure[index]);
  });

  const allIngredientsAndMesures = ingredientAndMesure.map((ing) => {
    return <p>{ing}</p>;
  });

  return (
    <>
      <Container>
        <CocktailWrapper>
          <div>
            <Name>{cocktail.drinkName}</Name>
            <Glass>{cocktail.glass}</Glass>
            <Category>{cocktail.drinkCategory}</Category>
            <hr />
            <IngredientsTitle>Ingredients: </IngredientsTitle>
            <Ingredients>{allIngredientsAndMesures}</Ingredients>
            <RecipeTitle>Recipe: </RecipeTitle>
            <Recipe>{cocktail.instructions}</Recipe>
            <hr />
            <ReviewsContainer>
              <ReviewsTitle>Reviews</ReviewsTitle>
              {numberOfCheckins > 0 && (
                <Average>Average review is {cocktailAverageRating} / 5</Average>
              )}
              <TotalReviews>
                This cocktail has{" "}
                <ReviewsButton onClick={handleClick}>
                  {numberOfCheckins} reviews
                </ReviewsButton>
              </TotalReviews>
            </ReviewsContainer>
          </div>
          <CheckinContainer>
            <CheckinButton onClick={handleCheckin}>CHECKIN</CheckinButton>
          </CheckinContainer>
        </CocktailWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CocktailWrapper = styled.div`
  height: 500px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  border-radius: 10px;
  padding: 0 15px;
  box-shadow: 3px 3px 3px #ff855f;
  @media (max-width: 768px) {
    width: 300px;
  }
`;

const Name = styled.h2``;

const Category = styled.div`
  margin-top: 5px;
  display: flex;
  font-style: italic;
  font-size: 15px;
  font-weight: 900;
  span:last-child {
    display: none;
  }
`;

const Glass = styled.p`
  color: gray;
  margin-top: 5px;
  font-size: 15px;
`;

const IngredientsTitle = styled.h3`
  font-weight: 900;
  font-size: 20px;
`;

const Ingredients = styled.div`
  margin-bottom: 18px;
  margin-top: 5px;
`;

const RecipeTitle = styled.h3`
  font-weight: 900;
  font-size: 20px;
`;

const Recipe = styled.p`
  margin-bottom: 18px;
  margin-top: 5px;
`;

const ReviewsContainer = styled.div`
  margin-top: 5px;
`;

const ReviewsTitle = styled.h3`
  font-size: 20px;
`;

const Average = styled.p`
  margin-top: 5px;
`;

const TotalReviews = styled.div`
  margin-top: 5px;
`;

const ReviewsButton = styled.span`
  font-weight: 900;
  cursor: pointer;
`;

const CheckinContainer = styled.div`
  display: flex;
`;

const CheckinButton = styled.button`
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  border-style: none;
  padding: 12px 0px;
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
  border-radius: 10px;
  :hover {
    background-color: #cb3000;
  }
`;

export default CocktailPage;
