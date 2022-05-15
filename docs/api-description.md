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
  "_id": "12345",
  "idDrink": "11023",
  "drinkName": "Almeria",
  "drinkCategory": "Ordinary Drink",
  "alcoholic": true,
  "glass": "Cocktail glass",
  "instructions": "In a shaker half-filled with ice cubes, combine all of the ingredients...",
  "image": "https://www.thecocktaildb.com/images/media/drink/rwsyyu1483388181.jpg",
  "ingredients": ["Dark rum", "Kahlua", "Egg white"],
  "mesure": ["2 oz", "1 oz", "1"],
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
    "_id": "12345",
    "idDrink": "11023",
    "drinkName": "Almeria",
    "drinkCategory": "Ordinary Drink",
    "alcoholic": "true",
    "glass": "Cocktail glass",
    "instructions": "In a shaker half-filled with ice cubes, combine all of the ingredients...",
    "image": "https://www.thecocktaildb.com/images/media/drink/rwsyyu1483388181.jpg",
    "ingredients": ["Dark rum", "Kahlua", "Egg white"],
    "mesure": ["2 oz", "1 oz", "1"]
    },
 "averageRating": 2,
 "checkins": {
     "_id": "12345",
    "userId": "67890",
    "locationFsId": "101112",
    "cocktailId": "131415",
    "rating": 2
    },
    {
     "_id": "67890",
    "userId": "12345",
    "locationFsId": "171819",
    "cocktailId": "131415",
    "rating": 2
    },
 "totalCheckins": 2,
   
}
```
### Add a new cocktail

Resource: `POST /api/cocktails:cocktailId`

**Example Request Body**

```json
{
  "drinkName": "abc",
  "glass": "def",
  "ingredients": ["a", "b", "c"],
  "instructions": "loremipsum",
  "mesure": ["1 oz", "1 oz", "2 oz"],
}
```

**Example Response**

```
200 OK
```

```json
{
  "idDrink": null,
  "drinkName": "abc",
  "drinkCategory": null,
  "alcoholic": "true",
  "glass": "def",
  "instructions": "loremipsum",
  "image": null,
  "ingredients": ["a", "b", "c"],
  "mesure": ["1 oz", "1 oz", "2 oz"]
 }
  
```

```
200 OK
```

```json
{
"cocktail": 
  { 
    "_id": "131415",
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
 "checkins": [
     "_id": "98213791",
    "userId": "12345",
    "locationFsId": "829337",
    "cocktailId": "131415",
    "rating": 2
    },
    {
     "_id": "179341819",
    "userId": "6789",
    "locationFsId": "12345",
    "cocktailId": "131415",
    "rating": 2
    },
   ]
 "totalCheckins": 2,   
}
```

## Users

### Get all users

Resource: `GET /api/users`

**Example Response**

```
200 OK
```

```json
{
  "_id": "12345",
  "googleId": "fourSquarePlaceId",
  "email": "def",
  "name": 5,
}
```

## Locations

- Cocktails
  Endpoint: `/api/cocktails`
  
  
- Checkins
- Locations
- Users
