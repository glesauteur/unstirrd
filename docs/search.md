# Search

## Location Search
- I use the FourSquare [Autocomplete Results endpoint](https://developer.foursquare.com/reference/autocomplete) which requires a minimum of 3 letters. This API calls is on the server side of the unstirrd app. I also include in the call the `latitude` and `longitude` of the user, that I get from the `Geolocation.getCurrentPosition()` method.

- I use a `debounce` function before making the API call to make sure we don't overcall it. 

## Cocktail Search
- I've setup a search index in the `cocktails` MongoDB collection and use the [autocomplete functionality](https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial/). In my API, I use the `$search` pipeline stage which will look for any matches between the `query` passed from the users and the values in the `drinkName` property in the `cocktails` collection document
- I also use the `debounce` function before making the API call to make sure we don't overcall it. 
