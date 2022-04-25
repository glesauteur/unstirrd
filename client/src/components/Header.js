import React from "react";

import styled from "styled-components";

const Header = () => {
  async function logout() {
    const res = await fetch("/api/auth/logout", { method: "POST" });

    if (res.ok) {
      window.location.href = "/";
    }
  }

  return (
    <>
      <LogoutContainer>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </LogoutContainer>
    </>
  );
};

const LogoutContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 10px;
`;

const LogoutButton = styled.button`
  border-style: none;
  border-radius: 5px;
  background-color: white;
  padding: 5px 10px;
  cursor: pointer;
`;

export default Header;
