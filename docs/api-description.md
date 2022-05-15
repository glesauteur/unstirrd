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
					"drinkCategory": "Ordinary Drink",
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
		     ...
			}
		},
		{
			"rating": 3,
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
					"_id": "62672ad6772775494fa0d454",
					"idDrink": "16967",
					"drinkName": "Vodka Fizz",
					"drinkCategory": "Other/Unknown",
					"alcoholic": true,
					"glass": "White wine glass",
					"instructions": "Blend all ingredients, save nutmeg. Pour into large white wine glass and sprinkle nutmeg on top.",
					"image": "https://www.thecocktaildb.com/images/media/drink/xwxyux1441254243.jpg",
					"ingredients": [
						"Vodka",
						"Half-and-half",
						"Limeade",
						"Ice",
						"Nutmeg"
					],
					"mesure": [
						"2 oz ",
						"2 oz ",
						"2 oz "
					]
				}
			],
			"location": {
				"fsq_id": "58c8b974951e7d7e08bc6fd8",
				...
			}
		},
		{
			"rating": 3,
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
					"_id": "62672ad6772775494fa0d454",
					"idDrink": "16967",
					"drinkName": "Vodka Fizz",
					"drinkCategory": "Other/Unknown",
					"alcoholic": true,
					"glass": "White wine glass",
					"instructions": "Blend all ingredients, save nutmeg. Pour into large white wine glass and sprinkle nutmeg on top.",
					"image": "https://www.thecocktaildb.com/images/media/drink/xwxyux1441254243.jpg",
					"ingredients": [
						"Vodka",
						"Half-and-half",
						"Limeade",
						"Ice",
						"Nutmeg"
					],
					"mesure": [
						"2 oz ",
						"2 oz ",
						"2 oz "
					]
				}
			],
			"location": {
				"fsq_id": "524a00ba11d2921532e7d511",
				...
			}
		},
		{
			"rating": 3,
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
					"_id": "62672ad2772775494fa0d310",
					"idDrink": "16047",
					"drinkName": "Campari Beer",
					"drinkCategory": "Beer",
					"alcoholic": true,
					"glass": "Beer mug",
					"instructions": "Use a 15 oz glass. Add Campari first. Fill with beer.",
					"image": "https://www.thecocktaildb.com/images/media/drink/xsqrup1441249130.jpg",
					"ingredients": [
						"Lager",
						"Campari"
					],
					"mesure": [
						"1 bottle ",
						"1 1/2 cl "
					]
				}
			],
			"location": {
				"fsq_id": "4b512f3af964a520684627e3",
				...
			}
		}
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
		{
			"_id": "6278152af72544988150670e",
			"from": "6278152af72544988150670c",
			"to": "6270740df13f3e18450e48a4",
			"user": [
				{
					"_id": "6278152af72544988150670c",
					"googleId": "oscar1234567890",
					"email": "oscar@oscar.com",
					"name": "Oscar"
				}
			],
			"checkins": [
				{
					"rating": 1,
					"user": [
						{
							"_id": "6278152af72544988150670c",
							"googleId": "oscar1234567890",
							"email": "oscar@oscar.com",
							"name": "Oscar"
						}
					],
					"cocktail": [
						{
							"_id": "62672ad2772775494fa0d2d3",
							"idDrink": "13938",
							"drinkName": "AT&T",
							"drinkCategory": "Ordinary Drink",
							"alcoholic": true,
							"glass": "Highball Glass",
							"instructions": "Pour Vodka and Gin over ice, add Tonic and Stir",
							"image": "https://www.thecocktaildb.com/images/media/drink/rhhwmp1493067619.jpg",
							"ingredients": [
								"Absolut Vodka",
								"Gin",
								"Tonic water"
							],
							"mesure": [
								"1 oz ",
								"1 oz ",
								"4 oz "
							]
						}
					],
					"location": {
						"fsq_id": "4bdf009389ca76b0cfab5d5e",
						"categories": [
							{
								"id": 13013,
								"name": "Hotel Bar",
								"icon": {
									"prefix": "https://ss3.4sqi.net/img/categories_v2/travel/hotel_bar_",
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
						"chains": [],
						"geocodes": {
							"main": {
								"latitude": 45.505528,
								"longitude": -73.557527
							},
							"roof": {
								"latitude": 45.505528,
								"longitude": -73.557527
							}
						},
						"link": "/v3/places/4bdf009389ca76b0cfab5d5e",
						"location": {
							"address": "701 Côte de la Pl d'Armes",
							"address_extended": "# 8",
							"country": "CA",
							"cross_street": "St-Jacques",
							"formatted_address": "701 Côte de la Pl d'Armes (St-Jacques), Montréal QC H2Y 2X6",
							"locality": "Montreal",
							"postcode": "H2Y 2X6",
							"region": "QC"
						},
						"name": "Terrasse Place d'Armes",
						"related_places": {
							"parent": {
								"fsq_id": "4af8dda8f964a520581022e3",
								"name": "Le Place d'Armes Hotel & Suites"
							}
						},
						"timezone": "America/Toronto"
					}
				}
			]
		}
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
		{
			"_id": "6278152af72544988150670e",
			"from": "6278152af72544988150670c",
			"to": "6270740df13f3e18450e48a4",
			"user": [
				{
					"_id": "6278152af72544988150670c",
					"googleId": "oscar1234567890",
					"email": "oscar@oscar.com",
					"name": "Oscar"
				}
			],
			"checkins": [
				{
					"rating": 1,
					"user": [
						{
							"_id": "6278152af72544988150670c",
							"googleId": "oscar1234567890",
							"email": "oscar@oscar.com",
							"name": "Oscar"
						}
					],
					"cocktail": [
						{
							"_id": "62672ad2772775494fa0d2d3",
							"idDrink": "13938",
							"drinkName": "AT&T",
							"drinkCategory": "Ordinary Drink",
							"alcoholic": true,
							"glass": "Highball Glass",
							"instructions": "Pour Vodka and Gin over ice, add Tonic and Stir",
							"image": "https://www.thecocktaildb.com/images/media/drink/rhhwmp1493067619.jpg",
							"ingredients": [
								"Absolut Vodka",
								"Gin",
								"Tonic water"
							],
							"mesure": [
								"1 oz ",
								"1 oz ",
								"4 oz "
							]
						}
					],
					"location": {
						"fsq_id": "4bdf009389ca76b0cfab5d5e",
						"categories": [
							{
								"id": 13013,
								"name": "Hotel Bar",
								"icon": {
									"prefix": "https://ss3.4sqi.net/img/categories_v2/travel/hotel_bar_",
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
						"chains": [],
						"geocodes": {
							"main": {
								"latitude": 45.505528,
								"longitude": -73.557527
							},
							"roof": {
								"latitude": 45.505528,
								"longitude": -73.557527
							}
						},
						"link": "/v3/places/4bdf009389ca76b0cfab5d5e",
						"location": {
							"address": "701 Côte de la Pl d'Armes",
							"address_extended": "# 8",
							"country": "CA",
							"cross_street": "St-Jacques",
							"formatted_address": "701 Côte de la Pl d'Armes (St-Jacques), Montréal QC H2Y 2X6",
							"locality": "Montreal",
							"postcode": "H2Y 2X6",
							"region": "QC"
						},
						"name": "Terrasse Place d'Armes",
						"related_places": {
							"parent": {
								"fsq_id": "4af8dda8f964a520581022e3",
								"name": "Le Place d'Armes Hotel & Suites"
							}
						},
						"timezone": "America/Toronto"
					}
				}
			]
		}
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

- Cocktails
  Endpoint: `/api/cocktails`
  
  
- Checkins
- Locations
- Users
