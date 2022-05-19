import React from "react";
import styled from "styled-components";
import { AuthContext } from "../auth/AuthContext";
import FollowingInfo from "../components/FollowingInfo";

const MyProfilePage = () => {
  const { user } = React.useContext(AuthContext);

  if (!user) {
    return (
      <Loading>
        <img src="/loading.svg" alt="loading-spinner" />
      </Loading>
    );
  }

  return (
    <>
      <Title>My Profile</Title>
      <ImgContainer>
        <Img alt="profile-picture" src={user.picture} />
      </ImgContainer>
      <UserInfoContainer>
        <PersonalInfo>
          <Info>
            <Subtitle>Personal Information</Subtitle>
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
        </PersonalInfo>
        <FollowingInfo userId={user.id} />
      </UserInfoContainer>
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
  font-size: 25px;
  padding-bottom: 20px;
`;

const ImgContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Img = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
}
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-content: center;
  gap: 10px;
  width: 500px;
  @media (min-width: 1025px) {
    align-items: center;
  }
  @media (max-width: 600px) {
    width: 350px;
  }
`;

const Info = styled.div`
  text-align: left;
  margin-bottom: 10px;
`;

const PersonalInfo = styled.div`
  margin-bottom: 10px;
  background-color: white;
  border-radius: 10px;
  padding: 15px 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  @media (min-width: 1025px) {
    width: 500px;
  }
`;

const Subtitle = styled.h2`
  text-align: center;
  font-size: 22px;
  margin-bottom: 10px;
`;

export default MyProfilePage;
