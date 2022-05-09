import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import UserCheckins from "./UserCheckins";

const ProfilePage = () => {
  let { userId } = useParams();

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const findUser = async function () {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUserProfile(data.user);
    };

    findUser();
  }, []);

  if (!userProfile) {
    return (
      <Loading>
        <img src="/loading.svg" alt="loading-spinner" />
      </Loading>
    );
  }

  return (
    <>
      <Title>{userProfile.name}'s Profile</Title>
      <UserCheckins></UserCheckins>
    </>
  );
};

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin-top: 25vh;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  padding-top: 20px;
  font-size: 35px;
  padding-bottom: 20px;
`;

export default ProfilePage;
