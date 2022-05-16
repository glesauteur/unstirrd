# Database Structure

**Database:** [MongoDB Atlast DB](https://www.mongodb.com/atlas/database)

## Collections

### Checkins
**Structure**: 
```json
"_id": "ObjectId()"
"userId": "ObjectId()"
"locationFsId": "FourSquareId"
"cocktailId": "ObjectId()"
"rating": "integer"
```
Every checkin creates a new document in this collection. For the `userId` and the `cocktailId`, it's a reference to their document in their own collection (`users` and `cocktails`) so we can send more details to the frontend if needed.

### Cocktails
**Structure**: 
```json
"_id": "ObjectId()"
"idDrink": "string"
"drinkName": "string"
"drinkCategory": "string"
"alcooholic": "boolean"
"glass": "string"
"instructions": "string"
"image": "string"
"ingredients": "array"
"mesure": "array"
```
The cocktail documents have been created from the [CocktailDB](https://www.thecocktaildb.com/api.php) through a batchImport. All the cocktails from this DB have been added to this collection. 

Limitation: if there are additional cocktails added to the [CocktailDB](https://www.thecocktaildb.com/api.php), there is no automated sync. An improvement would be te setup a cron job to scrape CocktailDB every day. 

### Follows

**Structure**: 

```json
"_id": "ObjectId()"
"from": "ObjectId()"
"to": "ObjectId()"
```
Every time there is a new following, a new document gets created in this collection. In the opposite, if there is a unfollow, the document will be removed from the collection. For the `from` and the `to`, it's a reference to their document in their own `users` collection so we can send more details to the frontend if needed.

Follows being their own documents means that we don't risk overloading user documents with a large follow array. It also keeps the data more consistent and lets us avoid maintaining consistency on two users. This also allows us to shard the data more easily if ever needed.


### Sessions

**Structure**: 

```json
"_id": "ObjectId()"
"expires": "date"
"session": "string"
```

When there is a new OAuth authentication, a new document gets created in this collection to keep the session running in the browser.

### Users

**Structure**:

```json
"_id": "ObjectId()"
"googleId": "string"
"email": "string"
"name": "string"
```

When new users creates their account by logging in through their Gmail account, a new document in the `users` collection gets created. 
