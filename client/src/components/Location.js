import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Location = ({ location }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/location/${location.place.fsq_id}`);
  };
  const locationCategories = location.place.categories.map(
    (locationCategorie, index) => {
      return (
        <span key={index}>
          <div>{locationCategorie.name} </div>
          <span>/</span>
        </span>
      );
    }
  );

  return (
    <>
      <Container onClick={handleClick}>
        <LocationWrapper>
          <NameCategoriesWrapper>
            <Name>{location.text.primary}</Name>
            <Categories>{locationCategories}</Categories>
          </NameCategoriesWrapper>
          <Address>{location.text.secondary}</Address>
        </LocationWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  cursor: pointer;
`;

const LocationWrapper = styled.div`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 8px;

  :hover {
    background-color: #f3f3f3;
  }
`;

const NameCategoriesWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: baseline;
`;

const Name = styled.div`
  font-weight: 900;
`;

const Categories = styled.div`
  display: flex;
  gap: 7px;
  font-size: 15px;
  font-style: italic;
  color: var(--primary-color);
  span:last-child {
    display: none;
  }
`;

const Address = styled.div`
  margin-top: 5px;
  color: gray;
`;

export default Location;
