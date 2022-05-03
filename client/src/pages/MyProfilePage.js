import React from "react";
import styled from "styled-components";
import { AuthContext } from "../auth/AuthContext";

const MyProfilePage = () => {
  const { user } = React.useContext(AuthContext);
  console.log(user);
  return (
    <>
      <Title>My Profile</Title>
      <UserInfoContainer>
        <Info>
          <p>
            <strong>Name: </strong>
            {user.name}
          </p>
        </Info>
        <Info>
          <p>
            <strong>Email address: </strong>
            {user.email}
          </p>
        </Info>
        <Info>
          <p>
            <strong>Number of followers: </strong>
          </p>
        </Info>
        <Info>
          <p>
            <strong>Number of followings: </strong>
          </p>
        </Info>
      </UserInfoContainer>
    </>
  );
};

const Title = styled.h2`
  color: white;
  text-align: center;
  padding-top: 20px;
  font-size: 25px;
  padding-bottom: 20px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: auto;
  align-content: center;
  gap: 10px;
`;

const Info = styled.div`
  text-align: left;
`;

export default MyProfilePage;
