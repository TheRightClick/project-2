require('dotenv').config({path: '.env'})
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session')
const PORT = process.env.PORT
const bcrypt = require('bcrypt')


//database below
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODBURI;
const db = mongoose.connection;
//mongoose stuff
mongoose.connect(mongoURI ,  { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Database Connected Successfully", mongoURI))
.catch(err => console.log(err))


//middleware below
app.use(
    session({
      secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
      resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
      saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
    })
  )
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))
//adds uploads to static route for accesing it
app.use(express.static('uploads'))
app.use(methodOverride('_method'))

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}

const isAdministrator = (req, res, next) => {
  if (req.session.currentUser.isAdmin === true) {
      return next()
  } else {
      res.redirect('/media')
  }
}

//controllers
const mediaController = require('./controllers/media.js');
app.use('/media',isAuthenticated, mediaController);

const usersControllers = require('./controllers/users')
app.use('/users', usersControllers);

const sessionsControllers = require('./controllers/sessions')
app.use('/sessions', sessionsControllers);




app.get('/', (req, res) => {
    res.render('home.ejs', {
        currentUser: req.session.currentUser
    })
})



app.listen(PORT, ()=>{
        console.log('Server listening');
    });