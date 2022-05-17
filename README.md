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
