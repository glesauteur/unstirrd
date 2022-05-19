import React, { useState } from "react";
import styled from "styled-components";

const NewCocktail = ({ cocktail, setCocktail }) => {
  const [newCocktail, setNewCocktail] = useState({
    drinkName: "",
    glass: "",
    ingredients: [],
    instructions: "",
    measure: [],
  });

  const [newCocktailAdded, setNewCocktailAdded] = useState(false);
  const [error, setError] = useState(false);

  const handleAddCocktail = async (e) => {
    e.preventDefault();
    if (newCocktail.drinkName === "") {
      setError("Drink Name is missing!");
      return;
    } else if (newCocktail.glass === "") {
      setError("Glass Name is missing!");
      return;
    } else if (newCocktail.ingredients.length === 0) {
      setError("Ingredients are missing!");
      return;
    } else if (newCocktail.measure.length === 0) {
      setError("Measures are missing!");
      return;
    } else if (newCocktail.instructions === "") {
      setError("Instructions are missing!");
      return;
    }
    setError(false);
    e.preventDefault();
    setNewCocktailAdded(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        drinkName: newCocktail.drinkName,
        glass: newCocktail.glass,
        ingredients: newCocktail.ingredients,
        instructions: newCocktail.instructions,
        measure: newCocktail.measure,
      }),
    };
    const response = await fetch("/api/cocktails", requestOptions);
    const data = await response.clone().json();

    const findCocktail = await fetch(
      `/api/cocktails?q=${data.newCocktail.drinkName}`
    );
    const cocktailData = await response.json();

    const setCocktailData = await setCocktail(cocktailData.newCocktail._id);
  };

  const handleFormChange = (e) => {
    if (e.target.name === "name") {
      setNewCocktail({ ...newCocktail, drinkName: e.target.value });
    } else if (e.target.name === "glass") {
      setNewCocktail({ ...newCocktail, glass: e.target.value });
    } else if (e.target.name === "ingredients") {
      let ing = [];
      e.target.value.split(";").forEach((v) => {
        ing.push(v);
      });
      setNewCocktail({ ...newCocktail, ingredients: ing });
    } else if (e.target.name === "mesures") {
      let mes = [];
      e.target.value.split(";").forEach((v) => {
        mes.push(v);
      });
      setNewCocktail({ ...newCocktail, measure: mes });
    } else if (e.target.name === "instructions") {
      setNewCocktail({ ...newCocktail, instructions: e.target.value });
    }
  };

  return (
    <>
      <Form>
        <Label for="name">Cocktail name: </Label>
        <Input name="name" onChange={handleFormChange}></Input>
        <Label for="glass">Glass type: </Label>
        <Input name="glass" onChange={handleFormChange}></Input>
        <Label for="ingredients">Ingredients: </Label>
        <Input name="ingredients" onChange={handleFormChange}></Input>
        <Label for="mesures">Mesures: </Label>
        <Input name="mesures" onChange={handleFormChange}></Input>

        <Label for="instructions">Instructions: </Label>
        <Input name="instructions" onChange={handleFormChange}></Input>
        <AddCocktail onClick={handleAddCocktail}>Add cocktail</AddCocktail>
        {newCocktailAdded && (
          <Added>
            Cocktail added - you can continue and submit your review.
          </Added>
        )}
        {error && <p>{error}</p>}
      </Form>
    </>
  );
};
const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #f0eeee;
  border-radius: 5px;
  margin-top: 10px;
  padding-bottom: 10px;
`;

const Label = styled.label`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 900;
  margin-left: 10px;
  margin-bottom: 3px;
`;
const Input = styled.input`
  width: 200px;
  border-radius: 5px;
  border-color: lightgray;
  border-style: solid;
  border-width: 1px;
  margin-left: 10px;
`;

const AddCocktail = styled.button`
  width: 100px;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border-style: none;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  padding: 5px;
  :hover {
    background-color: #cb3000;
  }
`;

const Added = styled.p`
  margin-left: 10px;
  margin-top: 5px;
  color: #0fa848;
`;

export default NewCocktail;
