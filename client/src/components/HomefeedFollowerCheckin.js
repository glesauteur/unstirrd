import React from "react";
import styled from "styled-components";

import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

const HomefeedFollowerCheckin = ({ follower }) => {
  let followerCheckins = follower.checkins.map((followerCheckin) => {
    const stars = [1, 2, 3, 4, 5].map((r) => {
      return (
        <Star key={r}>
          {followerCheckin.rating >= r ? <AiFillStar /> : <AiOutlineStar />}
        </Star>
      );
    });
    return (
      <>
        <CheckinBlock>
          <DrinkAndLocation>
            <Name>
              {follower.user[0].name}
              <Strong> had a </Strong>
              {followerCheckin.cocktail[0].drinkName}
            </Name>
            <div>
              <Strong>at </Strong> {followerCheckin.location.name}
            </div>
          </DrinkAndLocation>
          <StarsBlock>{stars}</StarsBlock>
        </CheckinBlock>
      </>
    );
  });

  return (
    <>
      <div>{followerCheckins}</div>
    </>
  );
};

const CheckinBlock = styled.div`
  color: #043132;
  background-color: #ffffffff;
  padding: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 10px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
`;

const DrinkAndLocation = styled.div`
  display: flex;
  gap: 5px;
`;

const Name = styled.div``;

const Strong = styled.span`
  font-weight: 900;
`;

const StarsBlock = styled.div`
  margin-top: 5px;
`;

const Star = styled.span`
  font-size: 30px;
  color: var(--primary-color);
`;

export default HomefeedFollowerCheckin;
