import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const Header = ({ UnstirrdLogo }) => {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const [hamburger, setHamburger] = useState(false);

  async function logout() {
    const res = await fetch("/api/auth/logout", { method: "POST" });

    if (res.ok) {
      window.location.href = "/signin";
    }
  }

  const handleCheckins = () => {
    setHamburgerClicked(false);
    navigate(`profile/${user.id}/checkins`);
  };

  const handleHomepage = () => {
    setHamburgerClicked(false);
    navigate(`/`);
  };

  const handleProfile = () => {
    setHamburgerClicked(false);
    navigate(`/my-profile`);
  };

  const handleHomefeed = () => {
    setHamburgerClicked(false);
    navigate(`/homefeed`);
  };

  const handleHamburgerClick = () => {
    if (hamburgerClicked) {
      setHamburgerClicked(false);
    } else {
      setHamburgerClicked(true);
    }
  };

  return (
    <>
      <HeaderContainer>
        <LogoContainer>
          <Logo src={UnstirrdLogo} onClick={handleHomepage} />
        </LogoContainer>
        <ButtonsContainer>
          {user && (
            <MobileMenu>
              <MenuIcon onClick={handleHamburgerClick}>
                <Span></Span>
                <Span></Span>
                <Span></Span>
              </MenuIcon>
              {hamburgerClicked && (
                <NavMenu>
                  <HomefeedButton onClick={handleHomefeed}>
                    Homefeed
                  </HomefeedButton>
                  <MyCheckinsButton onClick={handleCheckins}>
                    My Checkins
                  </MyCheckinsButton>
                  <MyProfileButton onClick={handleProfile}>
                    Profile
                  </MyProfileButton>
                  <LogoutButton onClick={logout}>Logout</LogoutButton>
                </NavMenu>
              )}
            </MobileMenu>
          )}
          {user && (
            <DesktopMenu>
              <DesktopMenuContainer>
                <DesktopHomefeedButton onClick={handleHomefeed}>
                  Homefeed
                </DesktopHomefeedButton>
                <DesktopMyCheckinsButton onClick={handleCheckins}>
                  My Checkins
                </DesktopMyCheckinsButton>
                <DesktopMyProfileButton onClick={handleProfile}>
                  Profile
                </DesktopMyProfileButton>
                <DesktopLogoutButton onClick={logout}>
                  Logout
                </DesktopLogoutButton>
              </DesktopMenuContainer>
            </DesktopMenu>
          )}
        </ButtonsContainer>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.div`
  margin: 20px;
  align-items: flex-start;
  display: flex;
`;

const LogoContainer = styled.div``;

const Logo = styled.img`
  width: 40%;
  position: fixed;
  cursor: pointer;
  @media (min-width: 1200px) {
    width: 10%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 20%;
  }
`;

const ButtonsContainer = styled.div`
  width: 100%;
`;

const MobileMenu = styled.div`
  cursor: pointer;
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }
`;

const DesktopMenu = styled.div`
  cursor: pointer;
  display: none;
  @media (min-width: 1025px) {
    display: block;
  }
`;

const DesktopMenuContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 25px;
`;

const MenuIcon = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Span = styled.div`
  width: 35px;
  height: 5px;
  background-color: white;
  margin: 3px 0;
  transition: 0.4s;
  border-radius: 5px;
  display: block;
`;

const NavMenu = styled.div``;

const LogoutButton = styled.div`
  border-style: none;
  background-color: white;
  cursor: pointer;
  font-size: 15px;
  text-align: center;
  padding-left: 5px;
  padding-bottom: 4px;
  :hover {
    background-color: #ffb8a2;
  }
`;

const MyCheckinsButton = styled.div`
  cursor: pointer;
  padding-top: 4px;
  text-align: center;
  background-color: white;
  padding-left: 5px;
  font-size: 15px;
  :hover {
    background-color: #ffb8a2;
  }
`;

const HomefeedButton = styled.div`
  cursor: pointer;
  padding-top: 4px;
  text-align: center;
  background-color: white;
  padding-left: 5px;
  font-size: 15px;
  :hover {
    background-color: #ffb8a2;
  }
`;

const DesktopLogoutButton = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 900;
  :hover {
    transform: scale(1.2);
  }
`;

const DesktopMyCheckinsButton = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 900;
  :hover {
    transform: scale(1.1);
  }
`;

const DesktopHomefeedButton = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 900;
  :hover {
    transform: scale(1.1);
  }
`;

const DesktopMyProfileButton = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 900;
  :hover {
    transform: scale(1.2);
  }
`;

const MyProfileButton = styled.div`
  cursor: pointer;
  padding-left: 5px;
  background-color: white;
  text-align: center;
  font-size: 15px;
  :hover {
    background-color: #ffb8a2;
  }
`;

export default Header;
