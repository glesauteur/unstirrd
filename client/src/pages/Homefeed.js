import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomefeedActivity from "../components/HomefeedActivity";

const Homefeed = () => {
  const [followingCheckins, setFollowingCheckins] = useState(null);
  const [allCheckins, setAllCheckins] = useState(null);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
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

      // TODO: Store creation date in DB and orderBy instead.
      setFollowingCheckins(data.checkins.reverse());
    };
    const getAllCheckins = async function () {
      const response = await fetch(`api/checkins`);
      const data = await response.json();

      // TODO: Store creation date in DB and orderBy instead.
      setAllCheckins(data.checkins.reverse());
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

  const followingActivities = followingCheckins.map((following, index) => {
    return (
      <span key={index}>
        <HomefeedActivity checkin={following} />
      </span>
    );
  });

  const checkinsActivities = allCheckins.map((checkin, index) => {
    return (
      <span key={index}>
        <HomefeedActivity checkin={checkin} />
      </span>
    );
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

export default Homefeed;
