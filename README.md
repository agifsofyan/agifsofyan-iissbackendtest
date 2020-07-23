#Simple RestfulApi To Manage CRUD With Express.js And Mongodb

##Requirements
- [Node](https://github.com/nodejs/node) / [NPM](https://github.com/npm/cli)
- [Mongodb](https://github.com/mongodb/mongo)

###Start
1. `git clone https://github.com/figa-Oz/sinergi_expressjs_mongodb_restfulapi.git && cd sinergi_expressjs_mongodb_restfulapi`
2. `npm install` or `yarn add` to install dependencies
3. Edit your connection database (Mongodb) in config//db/config.js. 
	> uri: 'mongodb://<dbuser>:<dbpassword>@<server/host>:<port>/<dbname>?authSource=<role>'
4. run server (on port:3000) with ``npm start`` from the project root directory

####HTTP - Request

Header: "Content-type: application/json"

| Route / URL | METHOD | Body / Field | Response | Info |
| ----------: | -----: | -----------: | -------: | ---: |
| localhost:3000/contacts | GET |  | ```json
{
    "code": 200,
    "message": "Execute Data Success",
    "count": 14,
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
}
``` | To get all contact |