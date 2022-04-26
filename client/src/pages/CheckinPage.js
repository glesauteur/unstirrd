import React, { useState } from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

import CocktailsSearchBar from "../components/CocktailsSearchBar";

const CheckinPage = ({ locationId }) => {
  const [hover, setHover] = useState(false);

  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    console.log("submit!");
  };

  const stars = [1, 2, 3, 4, 5].map((r) => {
    return (
      <Star
        onMouseEnter={() => setHoverRating(r)}
        onMouseLeave={() => setHoverRating(0)}
        onClick={() => setRating(r)}
      >
        {rating >= r || hoverRating >= r ? <AiFillStar /> : <AiOutlineStar />}
      </Star>
    );
  });

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
              <CocktailsSearchBar />
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
  height: 100vh;
`;

const CheckinWrapper = styled.div`
  height: 500px;
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

const RatingContainer = styled.div`
  margin-top: 10px;
`;

const CheckinContainer = styled.div`
  display: flex;
`;

const SubmitReview = styled.button`
  width: 100%;
  margin-top: 30px;
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
