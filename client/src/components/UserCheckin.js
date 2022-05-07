import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

const UserCheckin = ({ userCheckin, locationId }) => {
  const navigate = useNavigate();
  const stars = [1, 2, 3, 4, 5].map((r) => {
    return (
      <Star key={r}>
        {userCheckin.rating >= r ? <AiFillStar /> : <AiOutlineStar />}
      </Star>
    );
  });

  const handleLocation = () => {
    navigate(`/location/${locationId}`);
  };
  return (
    <CheckinsWrapper>
      <Name onClick={handleLocation}>{userCheckin.location.name}</Name>
      <Location>{userCheckin.location.location.formatted_address}</Location>
      <Cocktail>
        <strong>Rated Cocktail:</strong> {userCheckin.cocktail[0].drinkName}
      </Cocktail>
      <Rating>{stars}</Rating>
    </CheckinsWrapper>
  );
};

const CheckinsWrapper = styled.div`
  height: 170px;
  width: 300px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 15px;
  box-shadow: 3px 3px 3px #ff855f;
`;

const Name = styled.p`
  margin-top: 10px;
  font-weight: 900;
  font-size: 20px;

  :hover {
    cursor: pointer;
    color: var(--primary-color);
  }
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

export default UserCheckin;
