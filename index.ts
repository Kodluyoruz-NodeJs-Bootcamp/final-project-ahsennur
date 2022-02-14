
import * as dotenv from 'dotenv'
dotenv.config();
import path from 'path'
import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import "reflect-metadata"

import {createConnection} from "typeorm"
import methodOverride from 'method-override'

import usersrouter from './router/UserRouter'
import pageRouter from './router/pageRouter'
import movieRouter from './router/movieRouter'

import movieCommentRouter from './router/movieCommentRouter'
import authRouter from './router/authRouter'

import movieLikeRouter from './router/movieLikeRouter'


import movieStarRouter from './router/movieStarRouter'

import movieStarCommentRouter from './router/movieStarCommentRouter'

import movieStarLikeRouter from './router/movieStarLikeRouter'
import passport from 'passport'
import flash from 'connect-flash'
import User from './entity/User'


const app = express()

const publicDirectoryPath = path.join(__dirname, './public')

const PORT = process.env.PORT || 3000

//set app
// app.set('port', port);

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, '/views'));

app.use(express.static(publicDirectoryPath))

app.use(bodyParser.json())

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true  }))

app.use(express.urlencoded({
    extended: true
}))

app.use(
    session({
      secret: process.env.SECRET_OR_KEY as string,
      resave: true,
      saveUninitialized: true
    })
  );

app.use(flash());

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.use(passport.initialize())

app.use(passport.session())

app.use(usersrouter)
app.use(authRouter)
app.use(pageRouter)
app.use(movieRouter)
app.use('/movieComments', movieCommentRouter)
app.use('/movieLikes', movieLikeRouter)
app.use(movieStarRouter)
app.use('/movieStarComments', movieStarCommentRouter)
app.use('/movieStarLikes', movieStarLikeRouter)

app.get("*", (req,res,next)=> {
  res.status(404).render("404pnf",{page_name:"404pnf"});
});

//create db connection and start to listen
createConnection().then(connection =>{
    console.log("db is ok")
    app.listen(PORT, () => {
        console.log(`Server is up on port ${PORT}`)
    }) 
})
