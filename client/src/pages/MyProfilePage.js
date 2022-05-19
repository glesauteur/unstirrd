import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";

// source: <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Smashicons - Flaticon</a>
import UserLogo from "../assets/user.png";

const MyProfilePage = () => {
  const { user } = React.useContext(AuthContext);
  const [followers, setFollowers] = useState(null);
  const [followings, setFollowings] = useState(null);

  useEffect(() => {
    const findFollowers = async function () {
      const response = await fetch(`/api/users/${user.id}/followers`);
      const data = await response.json();
      setFollowers(data.followers);
    };

    const findFollowings = async function () {
      const response = await fetch(`/api/users/${user.id}/followings`);
      const data = await response.json();
      setFollowings(data.followings);
    };

    findFollowings();
    findFollowers();
  }, []);

  if (!followers || !followings) {
    return (
      <Loading>
        <img src="/loading.svg" alt="loading-spinner" />
      </Loading>
    );
  }
  const allFollowers = followers.map((follower) => {
    return (
      <StyledLink
        to={{
          pathname: `/profile/${follower.user[0]._id}/checkins`,
        }}
      >
        <Follows>
          <p>{follower.user[0].name} </p>{" "}
          <p>
            {follower.user[0].picture.length > 0 ? (
              <SmallImg alt="user-photo" src={follower.user[0].picture} />
            ) : (
              <SmallImg alt="user-photo" src={UserLogo} />
            )}
          </p>
        </Follows>
      </StyledLink>
    );
  });

  const allFollowings = followings.map((following) => {
    return (
      <StyledLink
        to={{
          pathname: `/profile/${following.user[0]._id}/checkins`,
        }}
      >
        <Follows>
          <p>{following.user[0].name} </p>{" "}
          <p>
            {following.user[0].picture.length > 0 ? (
              <SmallImg alt="user-photo" src={following.user[0].picture} />
            ) : (
              <SmallImg alt="user-photo" src={UserLogo} />
            )}
          </p>
        </Follows>
      </StyledLink>
    );
  });

  console.log(user);

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
        <FollowingInfo>
          <Info>
            <Subtitle>Following information</Subtitle>

            <p style={{ marginBottom: "10px" }}>
              {followers.length > 0 ? (
                <strong>Followers ({followers.length}) </strong>
              ) : (
                <strong>Followers (0) </strong>
              )}
            </p>
            {allFollowers ? (
              <AllFollows>{allFollowers}</AllFollows>
            ) : (
              <p>loading</p>
            )}
          </Info>
          <Info>
            <p style={{ marginBottom: "10px" }}>
              {followings.length > 0 ? (
                <strong>Followings ({followings.length}) </strong>
              ) : (
                <strong>Followings (0) </strong>
              )}
            </p>
            <AllFollows>{allFollowings}</AllFollows>
          </Info>
        </FollowingInfo>
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

const SmallImg = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  :hover {
    border-style: solid;
    border-color: var(--primary-color);
    border-width: 2px;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-content: center;
  gap: 10px;
  @media (min-width: 1025px) {
    width: 30%;
    align-items: center;
  }
  @media (max-width: 1024px) {
    margin-right: 25px;
    margin-left: 25px;
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

const FollowingInfo = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 15px 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  @media (min-width: 1025px) {
    width: 500px;
  }
`;

const Follows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: center;
  min-width: 70px;
`;

const AllFollows = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  :hover {
    color: var(--primary-color);
  }
`;

export default MyProfilePage;
