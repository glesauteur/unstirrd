import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import UserCheckin from "../components/UserCheckin";
import { AuthContext } from "../auth/AuthContext";
import FollowingInfo from "../components/FollowingInfo";
// source: <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Smashicons - Flaticon</a>
import UserLogo from "../assets/user.png";

const UserCheckins = () => {
  const { user } = React.useContext(AuthContext);
  let { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [following, setFollowing] = useState(false);
  const [userCheckins, setUserCheckins] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}/checkins`)
      .then((response) => response.json())
      .then((response) => setUserCheckins(response.checkins))
      .catch((err) => console.error(err));
  }, [userId]);

  useEffect(() => {
    const findUserInfo = async function () {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUserInfo(data.user);
    };

    const isFollowing = async function () {
      const response = await fetch(`/api/users/${user.id}/${userId}`);
      const data = await response.json();
      setFollowing(data.isFollowing);
    };

    isFollowing();
    findUserInfo();
  }, [userId, user.id]);

  const handleFollow = async (e) => {
    if (!following) {
      e.preventDefault();

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toUserId: userId,
        }),
      };
      const response = await fetch(
        `/api/users/${user.id}/following`,
        requestOptions
      );
      if (response.ok) {
        setFollowing(true);
      }
    }
  };

  const handleUnfollow = async (e) => {
    if (following) {
      e.preventDefault();

      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toUserId: userId,
        }),
      };
      const response = await fetch(
        `/api/users/${user.id}/unfollowing`,
        requestOptions
      );
      if (response.ok) {
        setFollowing(false);
      }
    }
  };

  if (!userInfo || !userCheckins) {
    return (
      <Loading>
        <img src="/loading.svg" alt="loading-spinner" />
      </Loading>
    );
  }

  const allCheckins = userCheckins.map((userCheckin, index) => {
    return (
      <span key={index}>
        {user.id !== userId && <FollowingInfo userId={userId} />}

        <div key={index}>
          {user.id !== userId && <Subtitle>Checkins</Subtitle>}

          <UserCheckin
            locationId={userCheckin.location.fsq_id}
            userCheckin={userCheckin}
          ></UserCheckin>
        </div>
      </span>
    );
  });

  return (
    <>
      <InfoContainer>
        {userId === user.id ? (
          <>
            <Title>My Checkins</Title>
            {userInfo.picture.length > 0 ? (
              <Img alt="profile-picture" src={userInfo.picture} />
            ) : (
              <Img alt="profile-user" src={UserLogo} />
            )}
          </>
        ) : (
          <>
            <Title>{userInfo.name}'s Profile</Title>
            {userInfo.picture.length > 0 ? (
              <Img alt="profile-picture" src={userInfo.picture} />
            ) : (
              <Img alt="profile-user" src={UserLogo} />
            )}
          </>
        )}
        {userId === user.id ? (
          <></>
        ) : (
          <FollowButtonContainer>
            {following ? (
              <FollowingButton onClick={handleUnfollow}>
                Following
              </FollowingButton>
            ) : (
              <FollowButton onClick={handleFollow}>Follow</FollowButton>
            )}
          </FollowButtonContainer>
        )}
      </InfoContainer>

      <Container>{allCheckins}</Container>
    </>
  );
};

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin-top: 25vh;
`;

const InfoContainer = styled.div`
  display: flex;
  padding: 20px 0px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  :last-child {
    margin-bottom: 30px;
  }
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  font-size: 25px;
`;

const Subtitle = styled.h2`
  color: white;
  font-size: 22px;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
`;

const FollowButtonContainer = styled.div`
  text-align: center;
`;

const FollowButton = styled.button`
  border-radius: 5px;
  cursor: pointer;
  font-weight: 900;
  padding: 10px 15px;
  background-color: transparent;
  color: white;
  border-color: #ffb7a1;
  border-style: solid;
  :hover {
    background-color: #ffb7a1;
    color: white;
  }
`;

const FollowingButton = styled.button`
  border-radius: 5px;
  cursor: pointer;
  font-weight: 900;
  padding: 10px 15px;
  background-color: white;
  color: #ffb7a1;
  border-color: #ffb7a1;
  border-style: solid;
  :hover {
    background-color: #ffb7a1;
    color: white;
  }
`;

export default UserCheckins;
