import { faHandBackFist } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../auth/AuthContext";
import HomefeedActivity from "../components/HomefeedActivity";

const Homefeed = () => {
  const { user } = React.useContext(AuthContext);
  const [followingCheckins, setFollowingCheckins] = useState(null);
  const [allCheckins, setAllCheckins] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [numItems, setNumItems] = useState(8);

  const handleToggle = () => {
    console.log("TOOGLE");
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  useEffect(() => {
    const getFollowingCheckins = async function () {
      const response = await fetch(`api/checkins?followingsOnly=true`);
      const data = await response.json();

      setFollowingCheckins(data.checkins);
    };
    const getAllCheckins = async function () {
      const response = await fetch(`api/checkins`);
      const data = await response.json();

      setAllCheckins(data.checkins);
    };

    getFollowingCheckins();
    getAllCheckins();
  }, []);

  if (!followingCheckins || !allCheckins) {
    return (
      <Loading>
        <img src="/loading.svg" alt="loading-spinner" />
      </Loading>
    );
  }

  const followingActivities = followingCheckins.map((following) => {
    return <HomefeedActivity checkin={following} />;
  });

  const checkinsActivities = allCheckins.map((checkin) => {
    return <HomefeedActivity checkin={checkin} />;
  });

  return (
    <Container>
      <SubContainer>
        <Title>Recent activities</Title>
        <ToggleContainer>
          <SubTitle>Follower activities only</SubTitle>
          <Input type="checkbox" id="switch" onClick={handleToggle} />
          <Label for="switch">Toggle</Label>
        </ToggleContainer>
        {!toggle ? (
          <div>{checkinsActivities}</div>
        ) : (
          <div>{followingActivities}</div>
        )}
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
  font-size: 25px;
  color: white;
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  font-size: 16px;
  color: white;
`;

const ToggleContainer = styled.span`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;

const Input = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;

  :checked + label {
    background: #bada55;
  }
  :checked + label:after {
    left: calc(100% - 4px);
    transform: translateX(-100%);
  }
`;

const Label = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: 50px;
  height: 25px;
  background: grey;
  display: block;
  border-radius: 100px;
  position: relative;
  :after {
    content: "";
    position: absolute;
    top: 4px;
    left: 5px;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }
  :active:after {
    width: 16px;
  }
`;

const Hr = styled.hr`
  border-color: white;
  border-style: solid;
`;

export default Homefeed;
