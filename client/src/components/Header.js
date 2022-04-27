import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import MyCheckins from "../pages/MyCheckins";

const Header = () => {
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

  return (
    <>
      <LogoutContainer>
        <MyCheckinsButton onClick={handleCheckins}>
          My Checkins
        </MyCheckinsButton>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </LogoutContainer>
    </>
  );
};

const LogoutContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  align-items: center;
  margin-right: 30px;
  gap: 40px;
`;

const LogoutButton = styled.button`
  border-style: none;
  border-radius: 5px;
  background-color: white;
  padding: 8px 10px;
  cursor: pointer;
`;

const MyCheckinsButton = styled.div`
  padding: 5px 10px;
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
