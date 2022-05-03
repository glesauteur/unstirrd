import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LocationPage = () => {
  let { locationId } = useParams();

  const [numberOfCheckins, setNumberOfCheckins] = useState(0);
  const [locationAverageRating, setLocationAverageRating] = useState(0);
  const [location, setLocation] = useState({
    fsq_id: "58c8b974951e7d7e08bc6fd8",
    categories: [
      {
        id: 13016,
        name: "Bar lounge",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/nightlife/default_",
          suffix: ".png",
        },
      },
      {
        id: 13065,
        name: "Restaurant",
        icon: {
          prefix: "https://ss3.4sqi.net/img/categories_v2/food/default_",
          suffix: ".png",
        },
      },
    ],
    chains: [],
    geocodes: {
      main: {
        latitude: 45.518853,
        longitude: -73.583915,
      },
      roof: {
        latitude: 45.518853,
        longitude: -73.583915,
      },
    },
    link: "/v3/places/58c8b974951e7d7e08bc6fd8",
    location: {
      address: "4328 Saint-Laurent Blvd",
      country: "CA",
      cross_street: "Marie-Anne",
      formatted_address:
        "4328 Saint-Laurent Blvd (Marie-Anne), Montréal QC H2W 1Z3",
      locality: "Montréal",
      neighborhood: ["Plateau Mont-Royal"],
      postcode: "H2W 1Z3",
      region: "QC",
    },
    name: "Darling",
    related_places: {},
    timezone: "America/Toronto",
  });

  const navigate = useNavigate();

  const handleCheckin = () => {
    navigate(`/checkin/${locationId}`);
  };

  const handleClick = () => {
    navigate(`/location/${locationId}/checkins`);
  };
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

    findLocationNumOfCheckins();
    findLocationRatings();
  }, []);

  const locationCategories = location.categories.map((locationCategorie) => {
    return (
      <>
        <div key={location.fsq_id}>{locationCategorie.name} </div>
        <span> / </span>
      </>
    );
  });

  return (
    <>
      <Container>
        <LocationWrapper>
          <Name>{location.name}</Name>

          <Categories>{locationCategories}</Categories>
          <Address>{location.location.formatted_address}</Address>
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
              src={`https://www.google.com/maps/embed/v1/place?q=1862%20Blvd%20de%20Maisonneuve%20O%2C%20Montr%C3%A9al%20QC%20H3H%201J8&key=${process.env.REACT_APP_API_KEY}`}
            ></Iframe>
          </IframeContainer>
          <CheckinContainer>
            <CheckinButton onClick={handleCheckin}>CHECKIN</CheckinButton>
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
`;

const LocationWrapper = styled.div`
  height: 500px;
  width: 500px;
  background-color: white;
  border-radius: 10px;
  padding: 0 15px;
  box-shadow: 3px 3px 3px #ff855f;
  @media (max-width: 768px) {
    width: 300px;
  }
`;

const Name = styled.h2`
  margin-top: 15px;
`;

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
