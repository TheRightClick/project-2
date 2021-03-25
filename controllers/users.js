const express = require('express');
const router = express.Router();
const User = require('../models/users')
const bcrypt = require('bcrypt')

const isAdministrator = (req, res, next) => {
    if (req.session.currentUser.isAdmin === true) {
        return next()
    } else {
        res.redirect('/media')
    }
  }
  const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}
//index
router.get('/showall', isAuthenticated, isAdministrator,  (req,res) => {
    User.find({}, (error, users, next)=>{
        if(error){
            console.log(err)
            next(err)
        }else {
        res.render('users/index.ejs', {
            users: users,
            currentUser: req.session.currentUser
        });
    }
    });
});

//edit
router.get('/:id/edit', isAuthenticated, (req, res)=>{
    if(req.session.currentUser.isAdmin){
        req.params.id = req.params.id
    } else{
    req.params.id = req.session.currentUser._id
    }
    User.findById(req.params.id, (error, selectedUser)=>{
      res.render('users/edit.ejs', {
          user: selectedUser,
          index: req.params.id,
          currentUser: req.session.currentUser
       })	
     })
  })
  
  router.put('/:id', isAuthenticated,  (req,res) => {
    if (req.body.isAdmin === "on") {
        req.body.isAdmin = true;
    }
    else {
        req.body.isAdmin = false;
    }
      if(!(req.body.password)){
            User.findByIdAndUpdate(req.params.id, { 
                "$set": { 
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                isAdmin: req.body.isAdmin
            } }, (err, product) =>{
                res.redirect('/users/showall')
            })
        }else {
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
            User.findByIdAndUpdate(req.params.id, { 
                "$set": { 
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                isAdmin: req.body.isAdmin
            } }, (err, product) =>{
                res.redirect('/media')
            })
        }
    })
      
    


  

//delete use
router.delete('/:id', isAuthenticated, isAdministrator,  (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            // redirect to the index so the user can see that the fruit got deleted
            // console.log(data)
            res.redirect('/usrs/showall')
        }
    })
})



//new user route
router.get('/new', (req,res)=>{
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser
    })
})

//user create
router.post('/', (req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        User.create(req.body, (err, userNew)=>{
            if(err){
                res.send(err)
            } else {
            res.redirect('/media')
            }
        })
        })


module.exports = router;