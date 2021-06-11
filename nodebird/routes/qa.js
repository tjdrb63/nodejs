const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn} = require('./middlewares');
const { diskStorage } = require('multer');

const router = express.Router();

try{
    fs.readdirSync('qaupload');
}catch(err){
    console.error('qaupload 폴더가 없어 생성');
    fs.mkdirSync('qaupload');
}

const upload = multer({
    storage:multer.diskStorage({
        destination(req,file,cb){
            cb(null,'qaupload');
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname);
            cb(null,path.basename(file.originalname,ext)+Date.now()+ext);
        
        },
    }),
    limits:{fileSize: 5*1024*1024},
});
router.post('/qa',isLoggedIn,upload.single('img'),(req,res)=>{
    console.log(req.file);
   // res.json({url:`/img/${req.file.filename}`});
});
const upload2 =multer();
router.post('/',isLoggedIn,upload2.none(),async(req,res,next)=>{
    try{
    console.log(req.user);
    const post = await Post.create({
            content:req.body.content,
            img:req.body.url,
            UserId:req.user.id,
    });
        res.redirect('/');
    }catch(error){
        console.log(error);
        next(error);
    }
});
    

module.exports = router;