import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Cocktail = ({ cocktail }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/cocktail/${cocktail._id}`);
  };

  return (
    <>
      <Container onClick={handleClick}>
        <CocktailWrapper>
          <NameCategoriesWrapper>
            <Name>{cocktail.drinkName}</Name>
            <Category>{cocktail.category}</Category>
          </NameCategoriesWrapper>
          <Glass>{cocktail.glass}</Glass>
        </CocktailWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  cursor: pointer;
`;

const CocktailWrapper = styled.div`
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

const Category = styled.div`
  display: flex;
  gap: 7px;
  font-size: 15px;
  font-style: italic;
  color: var(--primary-color);
  span:last-child {
    display: none;
  }
`;

const Glass = styled.div`
  margin-top: 5px;
  color: gray;
`;

export default Cocktail;
