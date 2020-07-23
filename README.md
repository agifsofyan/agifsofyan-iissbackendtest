# Simple RestfulApi To Manage CRUD With Express.js And Mongodb

## Requirements
- [Node](https://github.com/nodejs/node) / [NPM](https://github.com/npm/cli)
- [Mongodb](https://github.com/mongodb/mongo)

### Start
1. `git clone https://github.com/figa-Oz/agifsofyan-iiswebtest.git && cd agifsofyan-iiswebtest`
2. `npm install` or `yarn add` to install dependencies
3. Edit your connection database (Mongodb) in config//db/config.js. 
```javascript
module.exports = {
    uri: 'mongodb://<dbuser>:<dbpassword>@<server/host>:<port>/<dbname>?authSource=<role>'
}
```
4. run server (on port:4000) with ``npm start`` from the project root directory

#### HTTP - Request

__Header = `"Content-type: application/json"`__

| Route / URL | METHOD | Info |
| :---------- | :-----: | :--- |
| localhost:4000/contacts | GET  | Get all contact |
| localhost:4000/contacts | POST | Create new contact |
| localhost:4000/contact/:_id | GET | Get 1 contact by ID |
| localhost:4000/contact/:_id | PUT | Update 1 contact by ID |
| localhost:4000/contact/:_id | DELETE | Delete 1 contact by ID |


__GET: `localhost:4000/contacts`__

_Request Input Body / Field:_ `NO`

_Response:_ if not empty data (success)
```json
{
    "code": 200,
    "message": "Execute Data Success",
    "count": 1,
    "data": [
        {
            "_id": "5f18a7280fcf3e79b0d46126",
            "name": "Dinda",
            "number": "0898990272",
            "birthplace": "japan",
            "birthday": "1991/07/07",
            "createdAt": "2020-07-22T20:52:57.170Z",
            "updatedAt": "2020-07-22T20:52:57.170Z",
            "__v": 0
        }
    ]
}
```

_Response:_ if empty data (success)
```json
{
    "code": 200,
    "message": "Execute Data Success",
    "count": 0,
    "data": []
}
```

---

__POST: `localhost:4000/contacts`__

_Request Input Body / Field:_
```json
{
    "name":"Dinda",
    "number":"0898990272",
    "birthplace":"japan",
    "birthday":"1991/07/07"
}
```

_Response_ if success
```json
{
    "code": 201,
    "message": "Update Success",
    "data": {
        "_id": "5f190a554524b30b4062ef14",
        "name": "Citra",
        "number": "085728274906",
        "birthplace": "Seol",
        "birthday": "1994/01/03",
        "info": "nothing",
        "createdAt": "2020-07-23T03:56:05.605Z",
        "updatedAt": "2020-07-23T04:22:25.645Z",
        "__v": 0
    }
}
```

_Response:_ if empty name field (error validation)
```json
{
	"code": 400,
    "message": "name can not be empty!"
}
```

---

__GET: `localhost:4000/contact/5f18a7280fcf3e79b0d46126`__

_Request Input Body / Field:_ `NO`

_Response:_ if not empty data (success)
```json
{
    "code": 200,
    "message": "Execute Data Success",
    "data": {
        "_id": "5f18a7280fcf3e79b0d46126",
        "name": "Dinda",
        "number": "0898990272",
        "birthplace": "japan",
        "birthday": "1991/07/07",
        "createdAt": "2020-07-22T20:52:57.170Z",
        "updatedAt": "2020-07-22T20:52:57.170Z",
        "__v": 0
    }
}
```

_Response:_  if empty data (error validation)
```json
{
    "code": 404,
    "message": "Contact with id 5f18a7280fcf3e79b0d46126 Not Found"
}
```

---

__PUT: `localhost:4000/contact/5f190a554524b30b4062ef14`__

_Request Input Body / Field:_
```json
{
    "name":"Kirana",
    "number":"0898990272",
    "birthplace":"japan",
    "birthday":"1991/07/07"
}
```

_Response_ if success
```json
{
    "code": 201,
    "message": "Update Success",
    "data": {
        "_id": "5f190a554524b30b4062ef14",
        "name": "Kirana",
        "number": "085728274906",
        "birthplace": "Seol",
        "birthday": "1994/01/03",
        "info": "nothing",
        "createdAt": "2020-07-23T03:56:05.605Z",
        "updatedAt": "2020-07-23T04:22:25.645Z",
        "__v": 0
    }
}
```

_Response:_ if not valid birtday field (error validation)
```json
{
	"code": 400,
    "message": "Birthday not valid!, ex: 1995/01/31"
}
```

---

__DELETE: `localhost:4000/contact/5f1910b71289890f803f79cd`__

_Request Input Body / Field:_ `NO`

_Response:_ if not empty data (success)
```json
{
    "code": 200,
    "message": "Contacts was deleted successfully!!"
}
```

_Response:_ if _ID not found (error validation)
```json
{
    "code": 404,
    "message": "Contact with id 5f1910b71289890f803f79cd Not Found"
}
```

---

_Response:_ if server error:
```json
{
	"code": 500,
    "message": "Internal Server Error"
}
```