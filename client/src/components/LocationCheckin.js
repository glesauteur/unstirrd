import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

const LocationCheckin = ({ locationCheckin, locationId }) => {
  const stars = [1, 2, 3, 4, 5].map((r) => {
    return (
      <Star key={r}>
        {locationCheckin.rating >= r ? <AiFillStar /> : <AiOutlineStar />}
      </Star>
    );
  });

  return (
    <CheckinsWrapper>
      <Cocktail>
        <strong>Rated Cocktail:</strong> {locationCheckin.cocktail[0].drinkName}{" "}
        ({locationCheckin.cocktail[0].drinkCategory})
      </Cocktail>
      <p>{locationCheckin.user[0].email}</p>

      <Rating>{stars}</Rating>
    </CheckinsWrapper>
  );
};

const CheckinsWrapper = styled.div`
  height: 150px;
  width: 400px;
  background-color: white;
  border-radius: 10px;
  padding: 0 15px;
  box-shadow: 3px 3px 3px #ff855f;
`;

const Name = styled.p`
  margin-top: 10px;
  font-weight: 900;
  font-size: 20px;
  color: black;
`;

const Location = styled.p`
  font-size: 13px;
  color: gray;
  margin-top: 5px;
`;

const Cocktail = styled.p`
  font-size: 15px;
  margin-top: 15px;
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
