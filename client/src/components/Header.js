import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = ({ UnstirrdLogo }) => {
  const navigate = useNavigate();

  async function logout() {
    const res = await fetch("/api/auth/logout", { method: "POST" });

    if (res.ok) {
      window.location.href = "/";
    }
  }

  const handleCheckins = () => {
    navigate(`/my-checkins`);
  };

  const handleHomepage = () => {
    navigate(`/`);
  };

  return (
    <>
      <HeaderContainer>
        <Logo src={UnstirrdLogo} onClick={handleHomepage} />
        <ButtonsContainer>
          <MyCheckinsButton onClick={handleCheckins}>
            My Checkins
          </MyCheckinsButton>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </ButtonsContainer>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 20%;
  align-content: center;
  margin-left: 30px;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-right: 30px;
  gap: 20px;
`;
const LogoutButton = styled.button`
  border-style: none;
  border-radius: 5px;
  background-color: white;
  padding: 8px 10px;
  cursor: pointer;
`;

const MyCheckinsButton = styled.div`
  padding: 5px 8px;
  cursor: pointer;
  color: white;
  font-weight: 900;
  :hover {
    border-style: solid;
    border-color: white;
    border-width: 1px;
  }
`;

export default Header;
