## Project setup

## XAMPP
-- RUN Apache and MySQL port:3306

-- go localhost/phpmyadmin/

-- create db => pets_nest_db

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev   <-- Use this
```

## Use Step
1. Create User
Use Postman
```bash
curl --location 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data '{
    "username" : "admin",
    "password" : "1234",
    "fullname" : "admin admin"
}'
```

2. Get access_token
```bash
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "admin", 
    "password": "1234"
}'
```
access_token has an expiration time of 1 hour.

3. Try to get profile
```bash
curl --location 'http://localhost:3000/users/profile' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer =>access_token<=' \
--data ''
```

4. When u have access_token Clone project https://github.com/sims4758/TEST-CRUD-REACT and follow the README.md

5. Try filling out the information and sending.

View data
http://localhost:3000/pets/all

Use Postman
```bash
## Offset
curl --location 'http://localhost:3000/pets/all/10/0' \
--header 'Authorization: Bearer =>access_token<=' \

## Find one
curl --location 'http://localhost:3000/pets/1' \
--header 'Authorization: Bearer =>access_token<='

## Update
curl --location --request PATCH 'http://localhost:3000/pets/3' \
--header 'Authorization: Bearer =>access_token<=' \
--header 'Content-Type: application/json' \
--data '{
    "petName" : "Demon",
    "petAge" : 2,
    "petSex" : "male"
}'

## Delete
curl --location --request DELETE 'http://localhost:3000/pets/3' \
--header 'Authorization: Bearer =>access_token<='
```

