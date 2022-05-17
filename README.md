# Unstirrd
Unstirrd is a cocktail review app. Want to know where the best Negroni is in Montreal? Simply sign up for Unstirrd and look it up. You’re going to find where the best Negroni is, based on other Unstirrd member reviews. If you’re trying a new cocktail bar and you want to know what their best cocktail is, you can also look for it.

Unstirrd is inspired by the app [Untappd](https://untappd.com/) but adapted to cocktails instead of beers.

## Tech Stack

  - React Frontend (create-react-app)
  - Node/Express API
  - MongoDB
  - Third Party APIs (foursquare, google, cocktailsdb)

## Architecture

For detailed info on how this project was built, view the [docs](./docs) folder.

## Features

  - Looking for Places: Search for your favorite bar and check-in a cocktail.
  - Looking for a specific cocktail: Search for the cocktail and check-in with a location. If the cocktail is not in our database, you can create your own.
  - Review your cocktail.
  - Follow your friends to discover new cocktails and places.

## Third Party APIs

  - The Cocktail DB: [https://rapidapi.com/thecocktaildb/api/the-cocktail-db/](https://rapidapi.com/thecocktaildb/api/the-cocktail-db/)
  - Foursquare Places: [https://foursquare.com/products/places/](https://foursquare.com/products/places/)
  - Maps Embed: https://developers.google.com/maps/documentation/embed/get-started

## Local Development

To run the frontend: 
- `cd client`
- `yarn install`
- `yarn start`

To run the backend (server): 
- `cd server`
- `yarn install`
- `yarn start`

Note: For authentication features / Google oauth callback, you'll need a tunnelling solution like [ngrok](https://ngrok.com/).

## Screenshots
<img width="1440" alt="Screen Shot 2022-05-16 at 8 51 17 PM" src="https://user-images.githubusercontent.com/11652333/168706355-07a96c48-427c-4fdf-b95b-c6782104b118.png">
<img width="1437" alt="Screen Shot 2022-05-16 at 8 51 38 PM" src="https://user-images.githubusercontent.com/11652333/168706358-d1d04db7-299b-4789-850a-7bafc1c9c532.png">
<img width="1437" alt="Screen Shot 2022-05-16 at 8 51 58 PM" src="https://user-images.githubusercontent.com/11652333/168706359-566bd0ec-b28a-4a07-8d6e-5708cbb88a1d.png">
<img width="1438" alt="Screen Shot 2022-05-16 at 8 52 10 PM" src="https://user-images.githubusercontent.com/11652333/168706360-f8759a73-e3a9-43c7-909a-21269c481dc6.png">
<img width="1439" alt="Screen Shot 2022-05-16 at 9 00 34 PM" src="https://user-images.githubusercontent.com/11652333/168706361-858a916b-d162-4e81-91e7-bee27d7a888c.png">
<img width="1438" alt="Screen Shot 2022-05-16 at 9 00 46 PM" src="https://user-images.githubusercontent.com/11652333/168706362-0cb9db39-0834-48ec-88da-531927aff92d.png">
<img width="1440" alt="Screen Shot 2022-05-16 at 9 00 59 PM" src="https://user-images.githubusercontent.com/11652333/168706363-30aedc45-6c15-410c-af82-25713b761ef5.png">
