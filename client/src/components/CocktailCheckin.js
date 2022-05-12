import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

const CocktailCheckin = ({ cocktailCheckin }) => {
  const [locationName, setLocationName] = useState(null);
  const [userName, setUserName] = useState(null);

  const navigate = useNavigate();
  const handleUserClick = () => {
    let userId = cocktailCheckin.userId;
    navigate(`/profile/${userId}/checkins`);
  };
  const stars = [1, 2, 3, 4, 5].map((r) => {
    return (
      <Star key={r}>
        {cocktailCheckin.rating >= r ? <AiFillStar /> : <AiOutlineStar />}
      </Star>
    );
  });

  useEffect(() => {
    const findLocationName = async function () {
      const response = await fetch(
        `/api/locations/${cocktailCheckin.locationFsId}`
      );
      const data = await response.json();
      setLocationName(data.name);
    };

    const findUserName = async function () {
      const response = await fetch(`/api/users/${cocktailCheckin.userId}`);
      const data = await response.json();
      setUserName(data.user.name);
    };

    findUserName();
    findLocationName();
  }, []);

  if (!locationName || !userName) {
    return (
      <Loading>
        <img src="/loading.svg" alt="loading-spinner" />
      </Loading>
    );
  }

  return (
    <CheckinsWrapper>
      <LocationWrapper>
        <strong>Location:</strong>
        <Location
          onClick={() => {
            navigate(`/location/${cocktailCheckin.locationFsId}`);
          }}
        >
          {" "}
          {locationName}
        </Location>
      </LocationWrapper>
      <User>
        <strong>By:</strong>{" "}
        <UserName onClick={handleUserClick}>{userName}</UserName>
      </User>

      <Rating>{stars}</Rating>
    </CheckinsWrapper>
  );
};

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin-top: 25vh;
`;

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

const LocationWrapper = styled.p`
  font-size: 15px;
  margin-top: 15px;
`;

const Location = styled.span`
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

export default CocktailCheckin;
