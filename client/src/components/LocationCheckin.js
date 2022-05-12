import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

const LocationCheckin = ({ locationCheckin }) => {
  const navigate = useNavigate();
  const handleUserClick = () => {
    let userId = locationCheckin.user[0]._id;
    navigate(`/profile/${userId}/checkins`);
  };
  const stars = [1, 2, 3, 4, 5].map((r) => {
    return (
      <Star key={r}>
        {locationCheckin.rating >= r ? <AiFillStar /> : <AiOutlineStar />}
      </Star>
    );
  });

  return (
    <CheckinsWrapper>
      <CocktailWrapper>
        <strong>Rated Cocktail:</strong>{" "}
        <Cocktail
          onClick={() => {
            navigate(`/cocktail/${locationCheckin.cocktail[0]._id}`);
          }}
        >
          {locationCheckin.cocktail[0].drinkName}
        </Cocktail>{" "}
      </CocktailWrapper>
      <User>
        <strong>By:</strong>{" "}
        <UserName onClick={handleUserClick}>
          {locationCheckin.user[0].name}
        </UserName>
      </User>

      <Rating>{stars}</Rating>
    </CheckinsWrapper>
  );
};

const CheckinsWrapper = styled.div`
  height: 150px;
  width: 300px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 15px;
  box-shadow: 3px 3px 3px #ff855f;
`;

const CocktailWrapper = styled.p`
  font-size: 15px;
  margin-top: 15px;
`;

const Cocktail = styled.span`
  :hover {
    color: var(--primary-color);
    font-weight: 900;
    cursor: pointer;
  }
`;

const User = styled.p`
  font-size: 15px;
  margin-top: 5px;
`;

const UserName = styled.span`
  cursor: pointer;
  :hover {
    font-weight: 900;
    color: var(--primary-color);
  }
`;

const Rating = styled.p`
  margin-top: 10px;
`;

const Star = styled.span`
  font-size: 30px;
  color: var(--primary-color);

  :hover {
    color: var(--primary-color);
  }
`;

export default LocationCheckin;
