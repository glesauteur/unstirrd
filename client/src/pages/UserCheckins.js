import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import UserCheckin from "../components/UserCheckin";
import { AuthContext } from "../auth/AuthContext";

const UserCheckins = () => {
  const { user } = React.useContext(AuthContext);
  let { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [following, setFollowing] = useState(false);
  const [userCheckins, setUserCheckins] = useState([
    {
      cocktail: [{ drinkName: "French Negroni", drinkCategory: "Cocktail" }],
      location: {
        fsq_id: "58c8b974951e7d7e08bc6fd8",
        categories: [{ name: "Lounge" }, { name: "Restaurant" }],
        location: {
          formatted_address:
            "4328 Saint-Laurent Blvd (Marie-Anne), Montréal QC H2W 1Z3",
        },
        name: "Coldroom",
      },
      rating: 4,
    },
    {
      cocktail: [{ drinkName: "Vieux Carre", drinkCategory: "Cocktail" }],
      location: {
        fsq_id: "58c8b974951e7d7e08bc6fd8",
        categories: [{ name: "Lounge" }, { name: "Bar" }],
        location: {
          formatted_address:
            "4328 Saint-Laurent Blvd (Marie-Anne), Montréal QC H2W 1Z3",
        },
        name: "Coldroom",
      },
      rating: 2,
    },
    {
      cocktail: [{ drinkName: "Old Fashioned", drinkCategory: "Cocktail" }],
      location: {
        fsq_id: "58c8b974951e7d7e08bc6fd8",
        categories: [{ name: "Restaurant" }, { name: "Bar" }],
        location: {
          formatted_address:
            "4328 Saint-Laurent Blvd (Marie-Anne), Montréal QC H2W 1Z3",
        },
        name: "Henrietta",
      },
      rating: 2,
    },
    {
      cocktail: [{ drinkName: "Last Word", drinkCategory: "Cocktail" }],
      location: {
        fsq_id: "58c8b974951e7d7e08bc6fd8",
        categories: [{ name: "Bar" }],
        location: {
          formatted_address:
            "4328 Saint-Laurent Blvd (Marie-Anne), Montréal QC H2W 1Z3",
        },
        name: "Siboire",
      },
      rating: 5,
    },
  ]);

  // useEffect(() => {
  //   fetch(`/api/users/${userId}/checkins`)
  //     .then((response) => response.json())
  //     .then((response) => setUserCheckins(response.checkins))
  //     .catch((err) => console.error(err));
  // }, []);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((response) => response.json())
      .then((response) => setUserInfo(response.user))
      .catch((err) => console.error(err));
  }, []);

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

  if (!userInfo) {
    return <div>loading</div>;
  }

  const allCheckins = userCheckins.map((userCheckin) => {
    return (
      <UserCheckin
        locationId={userCheckin.location.fsq_id}
        userCheckin={userCheckin}
      ></UserCheckin>
    );
  });

  return (
    <>
      <InfoContainer>
        <Title>{userInfo.email}'s Checkins</Title>
        <FollowButtonContainer>
          {following ? (
            <FollowingButton onClick={handleUnfollow}>
              Following
            </FollowingButton>
          ) : (
            <FollowButton onClick={handleFollow}>Follow</FollowButton>
          )}
        </FollowButtonContainer>
      </InfoContainer>
      <Container>{allCheckins}</Container>
    </>
  );
};

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
