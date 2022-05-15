# API Description

## Check-ins

### Create a check-in

Resource: `POST /api/checkins`

**Example Request Body**

```json
{
  "userId": "abc",
  "locationId": "fourSquarePlaceId",
  "cocktailId": "def",
  "rating": 5,
}
```

**Example Response**

```
200 OK
```

```json
{
  "userId": "abc",
  "locationId": "fourSquarePlaceId",
  "cocktailId": "def",
  "rating": 5,
}
```

## Cocktails

### Search for cocktails with keywords (max of 10 cocktails will be sent)

Resource: `GET /api/cocktails`

**Example wtih Query Argument**

`/api/cocktails?q=alm`

**Example Response**

```
200 OK
```

```json
{
  "_id": "62672ad2772775494fa0d2da",
  "idDrink": "11023",
  "drinkName": "Almeria",
  "drinkCategory": "Ordinary Drink",
  "alcoholic": true,
  "glass": "Cocktail glass",
  "instructions": "In a shaker half-filled with ice cubes, combine all of the ingredients...",
  "image": "https://www.thecocktaildb.com/images/media/drink/rwsyyu1483388181.jpg",
  "ingredients": ["Dark rum", "Kahlua", "Egg white"],
  "mesure": ["2 oz ", "1 oz ", "1 "],
}
```
### Search for a specific cocktail

Resource: `GET /api/cocktails:cocktailId`

**Example with URL Param**

`/api/cocktails/62672ad2772775494fa0d2da`

**Example Response**

```
200 OK
```

```json
{
"cocktail": 
  { 
    "_id": "62672ad2772775494fa0d2da",
    "idDrink": "11023",
    "drinkName": "Almeria",
    "drinkCategory": "Ordinary Drink",
    "alcoholic": "true",
    "glass": "Cocktail glass",
    "instructions": "In a shaker half-filled with ice cubes, combine all of the ingredients...",
    "image": "https://www.thecocktaildb.com/images/media/drink/rwsyyu1483388181.jpg",
    "ingredients": ["Dark rum", "Kahlua", "Egg white"],
    "mesure": ["2 oz ", "1 oz ", "1 "]
    },
 "averageRating": 2,
 "checkins": {
     "_id": "627926f1f268bda18d109a43",
    "userId": "6278152af725449881506703",
    "locationFsId": "58c8b974951e7d7e08bc6fd8",
    "cocktailId": "62672ad2772775494fa0d2da",
    "rating": 2
    },
    {
     "_id": "62792b8b111b894e977ff437",
    "userId": "6278152af72544988150670c",
    "locationFsId": "4bdf009389ca76b0cfab5d5e",
    "cocktailId": "62672ad2772775494fa0d2da",
    "rating": 2
    },
 "totalCheckins": 2,
   
}
```

## Users

## Locations

- Cocktails
  Endpoint: `/api/cocktails`
  
  
- Checkins
- Locations
- Users
