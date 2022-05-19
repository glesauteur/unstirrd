import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LocationPage = () => {
  let { locationId } = useParams();

  const [numberOfCheckins, setNumberOfCheckins] = useState(0);
  const [location, setLocation] = useState(null);
  const [locationAverageRating, setLocationAverageRating] = useState(0);

  const navigate = useNavigate();

  const handleCheckin = () => {
    navigate(`/checkin/${locationId}`);
  };

  const handleClick = () => {
    navigate(`/location/${locationId}/checkins`);
  };

  useEffect(() => {
    const findLocationNumOfCheckins = async function () {
      const response = await fetch(`/api/locations/${locationId}`);
      const data = await response.json();
      setNumberOfCheckins(data.totalCheckins);
    };

    const findLocationRatings = async function () {
      const response = await fetch(`/api/locations/${locationId}`);
      const data = await response.json();
      setLocationAverageRating(data.averageRating);
    };
    const findLocationInfo = async function () {
      const response = await fetch(`/api/locations/${locationId}`);
      const data = await response.json();
      setLocation(data);
    };

    findLocationInfo();
    findLocationNumOfCheckins();
    findLocationRatings();
  }, []);

  if (!location) {
    return (
      <Loading>
        <img src="/loading.svg" alt="loading-spinner" />
      </Loading>
    );
  }

  const locationCategories = location.categories.map(
    (locationCategorie, index) => {
      return (
        <span key={index}>
          <div key={location.fsq_id}>{locationCategorie.name} </div>
          <span> / </span>
        </span>
      );
    }
  );

  return (
    <>
      <Container>
        <LocationWrapper>
          <div>
            <Name>{location.name}</Name>
            <Categories>{locationCategories}</Categories>
            <Address>{location.address}</Address>
            <hr />
            <ReviewsContainer>
              <ReviewsTitle>Reviews</ReviewsTitle>
              {numberOfCheckins > 0 && (
                <Average>Average review is {locationAverageRating} / 5</Average>
              )}
              <TotalReviews>
                This place has{" "}
                <ReviewsButton onClick={handleClick}>
                  {numberOfCheckins} reviews
                </ReviewsButton>
              </TotalReviews>
            </ReviewsContainer>
            <IframeContainer>
              <Iframe
                style={{
                  frameborder: "0",
                  border: "0",
                  referrerpolicy: "no-referrer-when-downgrade",
                }}
                src={`https://www.google.com/maps/embed/v1/place?q=${location.latitude},${location.longitude}&key=${process.env.REACT_APP_API_KEY}`}
              ></Iframe>
            </IframeContainer>
          </div>
          <CheckinContainer>
            <CheckinButton onClick={handleCheckin}>CHECKIN</CheckinButton>
          </CheckinContainer>
        </LocationWrapper>
      </Container>
    </>
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
  align-items: center;
`;

const LocationWrapper = styled.div`
  height: 500px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  border-radius: 10px;
  padding: 0 15px;
  box-shadow: 3px 3px 3px #ff855f;
  @media (max-width: 768px) {
    width: 300px;
  }
`;

const Name = styled.h2``;

const Categories = styled.div`
  margin-top: 5px;
  display: flex;
  font-style: italic;
  font-size: 15px;
  font-weight: 900;
  span:last-child {
    display: none;
  }
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

const ReviewsButton = styled.span`
  font-weight: 900;
  cursor: pointer;
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
