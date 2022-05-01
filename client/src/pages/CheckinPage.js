import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AuthContext } from "../auth/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import CocktailsSearchBar from "../components/CocktailsSearchBar";
import NewCocktail from "../components/NewCocktail";

const CheckinPage = () => {
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [cocktail, setCocktail] = useState(null);
  const [newCocktail, setNewCocktail] = useState(false);

  const { user } = React.useContext(AuthContext);

  let { locationId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        locationId,
        cocktailId: cocktail,
        rating,
      }),
    };
    const response = await fetch("/api/checkins", requestOptions);
    const data = await response.json();
  };

  const stars = [1, 2, 3, 4, 5].map((r) => {
    return (
      <Star
        key={r}
        onMouseEnter={() => setHoverRating(r)}
        onMouseLeave={() => setHoverRating(0)}
        onClick={() => setRating(r)}
      >
        {rating >= r || hoverRating >= r ? <AiFillStar /> : <AiOutlineStar />}
      </Star>
    );
  });

  const handleNewCocktail = () => {
    if (newCocktail) {
      setNewCocktail(false);
    } else {
      setNewCocktail(true);
    }
  };

  return (
    <>
      <Container>
        <CheckinWrapper>
          <form onSubmit={handleSubmit}>
            <Name>Darling</Name>
            <Address>1862 Blvd de Maisonneuve O, Montréal QC H3H 1J8</Address>
            <hr />
            <Cocktail>
              <Title>What did you drink?</Title>
              <CocktailsSearchBar setCocktail={setCocktail} />
              <CustomCocktail>
                Had a custom cocktail? Add it
                <ClickHere onClick={handleNewCocktail}> here</ClickHere>!
                {newCocktail && <NewCocktail setCocktail={setCocktail} />}
              </CustomCocktail>
              <Title>How was it?</Title>
              <RatingContainer>{stars}</RatingContainer>
            </Cocktail>
            <CheckinContainer>
              <SubmitReview type="submit">SUBMIT REVIEW</SubmitReview>
            </CheckinContainer>
          </form>
        </CheckinWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckinWrapper = styled.div`
  width: 500px;
  background-color: white;
  border-radius: 10px;
  padding: 0 15px;
  box-shadow: 3px 3px 3px #ff855f;
`;

const Name = styled.h2`
  margin-top: 15px;
`;

const Address = styled.p`
  color: gray;
  margin-top: 5px;
  font-size: 15px;
`;

const Cocktail = styled.div`
  margin-top: 5px;
`;

const Title = styled.h3`
  font-size: 20px;
  margin-top: 15px;
`;

const ClickHere = styled.span`
  cursor: pointer;
  font-weight: 900;
`;

const CustomCocktail = styled.p`
  padding-top: 10px;
  font-size: 14px;
`;

const RatingContainer = styled.div`
  margin-top: 10px;
`;

const CheckinContainer = styled.div`
  display: flex;
`;

const SubmitReview = styled.button`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
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

const Star = styled.span`
  cursor: pointer;
  font-size: 30px;
  color: var(--primary-color);
  :hover {
    color: var(--primary-color);
  }
`;

export default CheckinPage;
