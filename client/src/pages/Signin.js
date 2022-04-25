import React from "react";
import styled from "styled-components";
import logo from "../assets/Unstirrd.svg";
import googleLogo from "../assets/Google__G__Logo.svg";

const Signin = () => {
  const handleSignIn = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <Wrapper>
      <SignInWrapper>
        <SignInBox>
          <Logo src={logo} />
          <Welcome>Welcome to Unstirrd</Welcome>
          <GoogleButton onClick={handleSignIn}>
            <GoogleLogo src={googleLogo} />
            Sign In with Google
          </GoogleButton>
        </SignInBox>
      </SignInWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background-image: linear-gradient(
    180deg,
    hsl(14deg 100% 50%) 0%,
    hsl(13deg 100% 56%) 11%,
    hsl(13deg 100% 59%) 22%,
    hsl(14deg 100% 63%) 34%,
    hsl(14deg 100% 66%) 45%,
    hsl(14deg 100% 69%) 56%,
    hsl(14deg 100% 72%) 67%,
    hsl(14deg 100% 76%) 78%,
    hsl(14deg 100% 79%) 89%,
    hsl(14deg 100% 82%) 100%
  );
`;

const SignInWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignInBox = styled.div`
  background-color: white;
  height: 250px;
  width: 300px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;

const Logo = styled.img`
  width: 20%;
`;

const Welcome = styled.h1`
  text-align: center;
  color: #043132;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  width: 220px;
  height: 35px;
  justify-content: center;
  gap: 8px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(15, 15, 15, 0.15);
  cursor: pointer;
  :hover {
    box-shadow: 2px 2px #ffb299;
  }
`;

const GoogleLogo = styled.img`
  width: 8%;
`;

export default Signin;
