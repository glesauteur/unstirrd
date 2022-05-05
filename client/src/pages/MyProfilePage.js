import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../auth/AuthContext";

const MyProfilePage = () => {
  const { user } = React.useContext(AuthContext);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

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

  const allFollowers = followers.map((follower) => {
    return (
      <Follows>
        <p>{follower.user[0].name} </p>{" "}
        <p>
          <i>({follower.user[0].email})</i>
        </p>
      </Follows>
    );
  });

  const allFollowings = followings.map((following) => {
    return (
      <Follows>
        <p>{following.user[0].name} </p>{" "}
        <p>
          <i>({following.user[0].email})</i>
        </p>
      </Follows>
    );
  });

  console.log(followers);
  return (
    <>
      <Title>My Profile</Title>
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

            <p style={{ marginBottom: "3px" }}>
              {followers.length > 0 ? (
                <strong>Followers ({followers.length}) </strong>
              ) : (
                <strong>Followers (0) </strong>
              )}
            </p>

            <p>{allFollowers}</p>
          </Info>
          <Info>
            <p style={{ marginBottom: "3px" }}>
              {followings.length > 0 ? (
                <strong>Followings ({followings.length}) </strong>
              ) : (
                <strong>Followings (0) </strong>
              )}
            </p>
            <p>{allFollowings}</p>
          </Info>
        </FollowingInfo>
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
  margin-bottom: 10px;
`;

const PersonalInfo = styled.div`
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  text-align: center;
  font-size: 22px;
  margin-bottom: 10px;
`;

const FollowingInfo = styled.div``;

const Follows = styled.div`
  display: flex;
  gap: 7px;
`;

export default MyProfilePage;
