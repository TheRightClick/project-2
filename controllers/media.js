const express = require('express');
const router = express.Router();
const Media = require('../models/media.js');
//require multer
const multer = require('multer')

// define multer storage
const storage =  multer.diskStorage ({
  destination:function(req, file, callback) {
    callback(null, 'uploads')
  }, 
  //add back extension
  filename:function(request, file, callback){
    callback(null, file.originalname)
  }
})
//upload parameters for multer

const upload= multer({
  storage:storage,
  // limits:{}
})

//index
router.get('/', (req,res) => {
    
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Media.find({description: regex}, (error, media, next)=>{
            if(error){
                console.log(err)
                next(err)
            }else {
            res.render('index.ejs', {
                media: media,
                currentUser: req.session.currentUser
            });
        }
        });
    }else if(req.query.filter){
        const regex = req.query.filter
        Media.find({category: regex}, (error, media, next)=>{
            if(error){
                console.log(err)
                next(err)
            }else {
            res.render('index.ejs', {
                media: media,
                currentUser: req.session.currentUser
            });
        }
        });
    } else if (req.query.filterNull){ 
        Media.find({"category.0": {$exists: false}}, (error, media, next)=>{
        if(error){
            console.log(err)
            next(err)
        }else {
        res.render('index.ejs', {
            media: media,
            currentUser: req.session.currentUser
        });
    }
    });
} else if (req.query.searchNull){ 
    Media.find({"description" : {"$exists" : true, "$ne" : ""}}, (error, media, next)=>{
    if(error){
        console.log(err)
        next(err)
    }else {
    res.render('index.ejs', {
        media: media,
        currentUser: req.session.currentUser
    });
}
});
}  else {
    Media.find({}, (error, media, next)=>{
        if(error){
            console.log(err)
            next(err)
        }else {
        res.render('index.ejs', {
            media: media,
            currentUser: req.session.currentUser
        });
    }
    });
}
});



//new
router.get('/new', (req, res)=>{
    res.render('new.ejs',{
        currentUser: req.session.currentUser
    });
});

//create
router.post('/upload', upload.single('imageFile'),(req, res, next)=>{  
    req.body.filePath = req.file.filename
      Media.create(req.body, (error, createdMedia) => {  
      console.log(req.body)  
      if (error){
            console.log(error);
            res.send(error)
        } 
        else {
          
            res.redirect('/media')
        }  
    });
  });

//edit
router.get('/:id/edit', (req, res)=>{
  Media.findById(req.params.id, (error, selectedMedia)=>{
    res.render('edit.ejs', {
        media: selectedMedia,
        index: req.params.id,
        currentUser: req.session.currentUser
     })	
   })
})

router.put('/:id', (req,res) => {
    let id = req.params.id
    Media.findByIdAndUpdate(req.params.id, req.body, (err, media) =>{
        res.redirect(`/media/${id}`);
    })    
})


//delete
router.delete('/:id', (req, res)=> {
    Media.findByIdAndRemove(req.params.id, (error, deletedMedia)=>{
        if (error){
            console.log(error);
            res.send(error)
        } 
        else {
            res.redirect('/media');
        }
        
    })
})



//show
router.get('/:id', (req, res)=>{
    Media.findById(req.params.id, (err, selectedMedia)=>{
        res.render('show.ejs', {
            media: selectedMedia,
            currentUser: req.session.currentUser
        } )
    });
});





function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
};







module.exports = router;