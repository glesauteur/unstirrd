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

`/api/cocktails/12345`

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

Resource: `POST /api/cocktails`

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
    {
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
  "user": [
    {  
      "_id": "12345",
      "googleId": "fourSquarePlaceId",
      "email": "abc@email.com",
      "name": "abc def",
    },
    {  
      "_id": "6789",
      "googleId": "fourSquarePlaceId",
      "email": "def@email.com",
      "name": "ghi jkl",
    },
   ]
}
```

### Get a user

Resource: `GET /api/users/12345`

**Example with URL Param**

`/api/users/12345`

**Example Response**

```
200 OK
```

```json
{
 "user": 
     {
      "_id": "12345",
      "googleId": "fourSquarePlaceId",
      "email": "abc@email.com",
      "name": "abc def",
     },
}
```

### Get checkins for a user

Resource: `GET /api/users/12345`

**Example with URL Param**

`/api/users/12345/checkins`

**Example Response**

```
200 OK
```

```json
{
 "checkins": [
	{
	"rating": 4,
	"user": [
	       {
		"_id": "6270740df13f3e18450e48a4",
		"googleId": "116230827991041529638",
		"email": "gabrielle.le.sauteur@gmail.com",
		"name": "Gabrielle Le Sauteur"
		}
	],
	"cocktail": [
		{
		"_id": "62672ad5772775494fa0d3cf",
		"idDrink": "11003",
		"drinkName": "Negroni",
		"drinkCategory": 
		"Ordinary Drink",
		"alcoholic": true,
		"glass": "Old-fashioned glass",
		"instructions": "Stir into glass over ice, garnish and serve.",
		"image": "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg",
		"ingredients": [
				"Gin",
				"Campari",
				"Sweet Vermouth"
				],
				"mesure": [
					"1 oz ",
					"1 oz ",
					"1 oz "
				]
		}
		],
		"location": {
			"fsq_id": "524a00ba11d2921532e7d511",
		        "...": "..."
			}
	},
	]
}
```

### Follow a user

Resource: `POST /api/users/:userId/following`

**Example with URL Param & Request Body**
From user:
`/api/users/12345/following`

To user:
```json
{
  "toUserId": 6789
}
```

**Example Response**

```
200 OK
```

### Unfollow a user

Resource: `DELETE /api/users/:userId/unfollowing`

**Example with URL Param & Request Body**
From user:
`/api/users/12345/unfollowing`

To user:
```json
{
  "toUserId": 6789
}
```

**Example Response**

```
200 OK
```
### Find all followers for a user and their respective checkins

Resource: `GET /api/users/:userId/followers`

**Example with URL Param**

`/api/users/12345/followers`

**Example Response**

```
200 OK
```
```json
{
	"followers": [
		{
		"_id": "627439af8c8706b8aca0329a",
		"from": "62707462f13f3e18450ec3c0",
		"to": "6270740df13f3e18450e48a4",
		"user": [
			{
			"_id": "62707462f13f3e18450ec3c0",
			"googleId": "106873948020649210758",
			"email": "glesauteur@gmail.com",
			"name": "Gabrielle Le Sauteur"
			}
		],
		"checkins": []
		},
	]
}
```
### Find all followings for a user and their respective checkins

Resource: `GET /api/users/:userId/followings`

**Example with URL Param**

`/api/users/12345/followings`

**Example Response**

```
200 OK
```
```json
{
	"followings": [
			{
			"_id": "627439af8c8706b8aca0329a",
			"from": "62707462f13f3e18450ec3c0",
			"to": "6270740df13f3e18450e48a4",
			"user": [
				{
				"_id": "62707462f13f3e18450ec3c0",
				"googleId": "106873948020649210758",
				"email": "glesauteur@gmail.com",
				"name": "Gabrielle Le Sauteur"
				}
			],
			"checkins": []
		},
	]
}
```
### Find if a user is following or not another one

Resource: `GET /api/users/:userId/:userFollowingId`

**Example with URL Param**

`/api/users/12345/6789`

**Example Response**

```
200 OK
```

```json
{
  "isFollowing": true
}
```

## Locations

### Search for locations matching the search param

Resource: `GET /api/locations/search`

**Example wtih Query Argument**

`/api/locations/search?q=darling&lat=45.5113586192307&long=-73.61271574796966`

**Example Response**

```
200 OK
```

```json
{
  "results": [
		{
		  "FourSquare Places Result #1"
		},
		{
		  "FourSquare Places Result #2"
		}
	],
}
```
### Search for a location with its FourSquare ID

Resource: `GET /api/locations/:locationFsId`

**Example wtih URL Param**

`/api/locations/58c8b974951e7d7e08bc6fd8`

**Example Response**

```
200 OK
```

```json
{
  "fsq_id": "58c8b974951e7d7e08bc6fd8",
  "name": "Darling",
  "address": "4328 Saint-Laurent Blvd (Marie-Anne), Montréal QC H2W 1Z3",
  "latitude": 45.518853,
  "longitude": -73.583915,
  "categories": [
		{
		  "id": 13016,
		  "name": "Lounge",
		  "icon": {
			"prefix": "https://ss3.4sqi.net/img/categories_v2/nightlife/default_",
			"suffix": ".png"
			}
		},
		{
		  "id": 13065,
		  "name": "Restaurant",
		  "icon": {
			"prefix": "https://ss3.4sqi.net/img/categories_v2/food/default_",
			"suffix": ".png"
			}
		}
	],
	"averageRating": "3.3",
	"checkins": [
		{
		  "_id": "627926f1f268bda18d109a43",
		  "userId": "6278152af725449881506703",
		  "locationFsId": "58c8b974951e7d7e08bc6fd8",
		  "cocktailId": "62672ad2772775494fa0d2da",
		  "rating": 2
		},
		{
		  "_id": "62792b8b111b894e977ff438",
		  "userId": "6278152af725449881506704",
		  "locationFsId": "58c8b974951e7d7e08bc6fd8",
		  "cocktailId": "62672ad2772775494fa0d2df",
		  "rating": 5
		},
	],
	"totalCheckins": 3
}
```
### Find all detailed checkins for a specific locations

Resource: `GET /api/locations/:locationFsId/checkins`

**Example wtih URL Param**

`/api/locations/58c8b974951e7d7e08bc6fd8/checkins`

**Example Response**

```
200 OK
```

```json
{
  "locationCocktails": [
  			{
			  "_id": "627926f1f268bda18d109a43",
			  "userId": "6278152af725449881506703",
			  "locationFsId": "58c8b974951e7d7e08bc6fd8",
			  "cocktailId": "62672ad2772775494fa0d2da",
			  "rating": 2,
			  "cocktail": [
			  		{
					  "_id": "62672ad2772775494fa0d2da",
					  "idDrink": "11023",
					  "drinkName": "Almeria",
					  "drinkCategory": "Ordinary Drink",
					  "alcoholic": true,
					  "glass": "Cocktail glass",
					  "instructions": "In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a cocktail glass.",
					  "image": "https://www.thecocktaildb.com/images/media/drink/rwsyyu1483388181.jpg",
				          "ingredients": [
							"Dark rum",
							"Kahlua",
							"Egg white"
							],
					  "mesure": [
						"2 oz ",
						"1 oz ",
						"1 "
						]
					}
				],
			  "user": [
				{
				  "_id": "6278152af725449881506703",
				  "googleId": "marc1234567890",
				  "email": "marc@marc.com",
				  "name": "Marc-Andre"
				}
			]
		}
	]
}
```
