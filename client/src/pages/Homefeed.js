import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../auth/AuthContext";
import HomefeedFollowerCheckin from "../components/HomefeedFollowerCheckin";

const Homefeed = () => {
  const { user } = React.useContext(AuthContext);
  const [followerCheckins, setFollowerCheckins] = useState([]);

  useEffect(() => {
    const getFollowerCheckins = async function () {
      const response = await fetch(`api/users/${user.id}/followers`);
      const data = await response.json();

      setFollowerCheckins(data.followers);
    };
    getFollowerCheckins();
  }, []);

  if (followerCheckins.length < 1) {
    return <div>loading..</div>;
  }

  console.log(followerCheckins);

  const allFollowers = followerCheckins.map((follower) => {
    return <HomefeedFollowerCheckin follower={follower} />;
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;
const SubContainer = styled.div`
  width: 50%;
  margin: auto;
  height: 100vh;
  position: fixed;
  border-radius: 10px;
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
