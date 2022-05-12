import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../auth/AuthContext";
import HomefeedFollowerCheckin from "../components/HomefeedFollowerCheckin";

const Homefeed = () => {
  const { user } = React.useContext(AuthContext);
  const [followingCheckins, setFollowingCheckins] = useState([]);

  useEffect(() => {
    const getFollowingCheckins = async function () {
      const response = await fetch(`api/users/${user.id}/followings`);
      const data = await response.json();

      setFollowingCheckins(data.followings);
    };
    getFollowingCheckins();
  }, []);

  if (followingCheckins.length < 1) {
    return (
      <Loading>
        <img src="/loading.svg" alt="loading-spinner" />
      </Loading>
    );
  }

  const allFollowers = followingCheckins.map((following) => {
    return <HomefeedFollowerCheckin following={following} />;
  });

  return (
    <Container>
      <SubContainer>
        <Title>Recent followers activities</Title>
        <div>{allFollowers}</div>
      </SubContainer>
    </Container>
  );
};

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin-top: 25vh;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  padding-bottom: 60px;
`;
const SubContainer = styled.div`
  @media (max-width: 1025px) {
    margin: 0px 25px;
  }
  @media (min-width: 1025px) {
    width: 50%;
    margin: auto;
    height: 100vh;
    border-radius: 10px;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  color: white;
  margin-bottom: 20px;
`;

const Hr = styled.hr`
  border-color: white;
  border-style: solid;
`;

export default Homefeed;
