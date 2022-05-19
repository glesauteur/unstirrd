import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// source: <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Smashicons - Flaticon</a>
import UserLogo from "../assets/user.png";

const FollowingInfo = ({ userId }) => {
  const [followers, setFollowers] = useState(null);
  const [followings, setFollowings] = useState(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const findFollowers = async function () {
      const response = await fetch(`/api/users/${userId}/followers`);
      const data = await response.json();
      setFollowers(data.followers);
    };

    const findFollowings = async function () {
      const response = await fetch(`/api/users/${userId}/followings`);
      const data = await response.json();
      setFollowings(data.followings);
    };

    findFollowings();
    findFollowers();
  }, [userId]);

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
        key={follower._id}
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
        key={following._id}
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

  return (
    <Container>
      <Subtitle>Following information</Subtitle>
      <FollowingContainer>
        <Info>
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
      </FollowingContainer>
    </Container>
  );
};

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin-top: 25vh;
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

const Container = styled.div`
  width: 500px;
  @media (max-width: 600px) {
    width: 350px;
  }
`;

const FollowingContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 15px 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
`;

const Info = styled.div`
  text-align: left;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  color: white;
  font-size: 22px;
  margin-bottom: 10px;
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

export default FollowingInfo;
