## user
- POST /user  
Request body:  
```json 
{
    "name": "Kiya Zhan",
    "email": "zz010@bucknell.edu",
    "password": "123456"
} 
```
Note: email shoud be unique.  
Response:  
```json
{
  "success": true,
  "data": {
    "_id": "6246444e4a1ed4eeb7dc5a74",
    "name": "Kiya Zhan",
    "email": "zz010@bucknell.edu",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDY0NDRlNGExZWQ0ZWViN2RjNWE3NCIsImlhdCI6MTY0ODc3MjE3NCwiZXhwIjoxNjUxMzY0MTc0fQ.lryjtfn7MpDd3jeubQGI8R_DVo0e2AfdmiMRfAk689c"
  }
}
```

- POST /user/login  
request body:

```json
{
    "email": "luxunzhe@usc.edu",
    "password": "123456"
}
```
response:  
```json
{
  "success": true,
  "data": {
    "_id": "62463dd67a0399cf7b1920bd",
    "name": "York Yao",
    "email": "luxunzhe@usc.edu",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDYzZGQ2N2EwMzk5Y2Y3YjE5MjBiZCIsImlhdCI6MTY0ODc3NDIwMSwiZXhwIjoxNjUxMzY2MjAxfQ.LpZgOh_T2cAu_P3uFU-ZWocUtl8tAGU57sKexJY_NY0"
  }
}
```

- GET /user/me  
Test api for authorization after login  
Note: use the token returned from a success login or registration request  
Auth:  
Bearer jwtToken, e.g.  
```json
{
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDYzZGQ2N2EwMzk5Y2Y3YjE5MjBiZCIsImlhdCI6MTY0ODc3NDIwMSwiZXhwIjoxNjUxMzY2MjAxfQ.LpZgOh_T2cAu_P3uFU-ZWocUtl8tAGU57sKexJY_NY0"
}
```
Response:  
```json
{
  "_id": "62463dd67a0399cf7b1920bd",
  "name": "York Yao",
  "email": "luxunzhe@usc.edu",
  "__v": 0
}
```