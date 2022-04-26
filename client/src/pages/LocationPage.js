import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Modal from "../components/Modal";

const LocationPage = () => {
  let { locationId } = useParams();

  const [location, setLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: process.env.REACT_APP_FS_TOKEN,
  //     },
  //   };

  //   fetch(`https://api.foursquare.com/v3/places/${locationId}`, options)
  //     .then((response) => response.json())
  //     .then((response) => setLocation(response))
  //     .catch((err) => console.error(err));
  // }, []);

  // if (!location) {
  //   return <div>...</div>;
  // }

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <Container>
        <LocationWrapper>
          <Name>Darling</Name>
          <Categories>Restaurant / Bar</Categories>
          <Address>1862 Blvd de Maisonneuve O, Montréal QC H3H 1J8</Address>
          <hr />
          <ReviewsContainer>
            <ReviewsTitle>Reviews</ReviewsTitle>
            <Average>Average review is 4/5</Average>
            <TotalReviews>This place has 10 reviews</TotalReviews>
          </ReviewsContainer>
          <IframeContainer>
            <Iframe
              style={{
                frameborder: "0",
                border: "0",
                referrerpolicy: "no-referrer-when-downgrade",
              }}
              src={`https://www.google.com/maps/embed/v1/place?q=1862%20Blvd%20de%20Maisonneuve%20O%2C%20Montr%C3%A9al%20QC%20H3H%201J8&key=${process.env.REACT_APP_API_KEY}`}
            ></Iframe>
          </IframeContainer>
          <CheckinContainer>
            <CheckinButton onClick={openModal}>CHECKIN</CheckinButton>
          </CheckinContainer>
        </LocationWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LocationWrapper = styled.div`
  height: 500px;
  width: 500px;
  background-color: white;
  border-radius: 10px;
  padding: 0 15px;
  box-shadow: 3px 3px 3px #ff855f;
`;

const Name = styled.h2`
  margin-top: 15px;
`;

const Categories = styled.div`
  margin-top: 5px;
  font-style: italic;
  font-size: 15px;
  font-weight: 900;
`;

const Address = styled.p`
  color: gray;
  margin-top: 5px;
  font-size: 15px;
`;

const ReviewsContainer = styled.div`
  margin-top: 5px;
`;

const ReviewsTitle = styled.h3`
  font-size: 20px;
`;

const Average = styled.p`
  margin-top: 5px;
`;

const TotalReviews = styled.div`
  margin-top: 5px;
`;

const IframeContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const Iframe = styled.iframe`
  width: 500px;
  height: 200px;
`;

const CheckinContainer = styled.div`
  display: flex;
`;

const CheckinButton = styled.button`
  width: 100%;
  margin-top: 30px;
  background-color: var(--primary-color);
  color: white;
  border-style: none;
  padding: 12px 0px;
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
  border-radius: 10px;
  :hover {
    background-color: #cb3000;
  }
`;

export default LocationPage;
