# Movies and Stars

A project where the user can add and remove movies and movie actors, can like and comment on the ones that are shared.
If the user makes these movies and movie actors visible to others by sharing them, other users in the system can comment and like these movies and movie actors.
One can login with Facebook or Google, or can register with username, email, password then can login.

## [LIVE](https://movies-and-stars.herokuapp.com/)

## Tech

- Node.js
- Typescript
- Express
- Typeorm
- Mysql
- Jwt

## Libraries Used

- bcryptjs
- body-parser
- class-validator
- connect-flash
- cookie-parser,
- cookie-session
- ejs
- express
- express-session
- express-validator
- jsonwebtoken
- method-override
- mysql2
- passport
- passport-facebook
- passport-google-oauth20
- passport-jwt
- passport-local
- reflect-metadata
- typeorm

### To Run At Local

To run at your local, MYSQL database related information must be filled in the ormconfig.js file.
.env file must be filled.

### To Login with Facebook and Google

#### Facebook

APP_ID and APP_SECRET keys should be obtained from {https://developers.facebook.com/app}s page and updated in the .env file.

FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
FACEBOOK_APP_CALLBACK_URL=

#### Google

CLIENT_ID and CLIENT_SECRET keys should be obtained from {https://developers.google.com}s page and updated in the .env file.

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

![](https://github.com/Kodluyoruz-NodeJs-Bootcamp/final-project-ahsennur/blob/main/login.jpg)

![](https://github.com/Kodluyoruz-NodeJs-Bootcamp/final-project-ahsennur/blob/main/movies.jpg)

![](https://github.com/Kodluyoruz-NodeJs-Bootcamp/final-project-ahsennur/blob/main/myMovies.jpg)

