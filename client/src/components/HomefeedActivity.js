import React from "react";
import styled from "styled-components";

import { useNavigate, useParams } from "react-router-dom";

import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

const HomefeedActivity = ({ checkin }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    let userId = checkin.user[0]._id;
    navigate(`/profile/${userId}/checkins`);
  };

  const stars = [1, 2, 3, 4, 5].map((r) => {
    return (
      <Star key={r}>
        {checkin.rating >= r ? <AiFillStar /> : <AiOutlineStar />}
      </Star>
    );
  });

  return (
    <>
      <CheckinBlock>
        <div>
          <div>
            <Name onClick={handleUserClick}>{checkin.user[0].name}</Name> had a
            <Strong>
              {" "}
              <Cocktail
                onClick={() => {
                  navigate(`/cocktail/${checkin.cocktail[0]._id}`);
                }}
              >
                {checkin.cocktail[0].drinkName}
              </Cocktail>{" "}
            </Strong>
          </div>
        </div>
        <div>
          at{" "}
          <Strong>
            <Location
              onClick={() => {
                navigate(`/location/${checkin.location.fsq_id}`);
              }}
            >
              {checkin.location.name}
            </Location>
          </Strong>
        </div>

        <StarsBlock>{stars}</StarsBlock>
      </CheckinBlock>
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

const Name = styled.span`
  cursor: pointer;
  :hover {
    color: var(--primary-color);
    font-weight: 900;
  }
`;

const Cocktail = styled.span`
  cursor: pointer;
  :hover {
    color: var(--primary-color);
    font-weight: 900;
  }
`;

const Location = styled.span`
  cursor: pointer;
  :hover {
    color: var(--primary-color);
    font-weight: 900;
  }
`;

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

export default HomefeedActivity;
