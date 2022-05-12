import React from "react";
import styled from "styled-components";

import { useNavigate, useParams } from "react-router-dom";

import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

const HomefeedFollowerCheckin = ({ following }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    let userId = following.user[0]._id;
    navigate(`/profile/${userId}/checkins`);
  };

  let followingCheckins = following.checkins.map((followingCheckin) => {
    const stars = [1, 2, 3, 4, 5].map((r) => {
      return (
        <Star key={r}>
          {followingCheckin.rating >= r ? <AiFillStar /> : <AiOutlineStar />}
        </Star>
      );
    });

    console.log(following);
    return (
      <>
        <CheckinBlock>
          <div>
            <div>
              <Name onClick={handleUserClick}>{following.user[0].name}</Name>{" "}
              had a
              <Strong>
                {" "}
                <Cocktail
                  onClick={() => {
                    navigate(`/cocktail/${followingCheckin.cocktail[0]._id}`);
                  }}
                >
                  {followingCheckin.cocktail[0].drinkName}
                </Cocktail>{" "}
              </Strong>
            </div>
          </div>
          <div>
            at{" "}
            <Strong>
              <Location
                onClick={() => {
                  navigate(`/location/${followingCheckin.location.fsq_id}`);
                }}
              >
                {followingCheckin.location.name}
              </Location>
            </Strong>
          </div>

          <StarsBlock>{stars}</StarsBlock>
        </CheckinBlock>
      </>
    );
  });

  return (
    <>
      <div>{followingCheckins}</div>
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

export default HomefeedFollowerCheckin;
