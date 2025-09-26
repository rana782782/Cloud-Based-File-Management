const express = require('express');
const multer = require('../config/multer.config');
const authMiddleware = require('../middleware/auth');
const fileModel = require('../models/files.model');
const firebase = require('../config/firebase-admin');

const router = express.Router();


router.get('/homepage', (req, res) => {
    res.render('homepage');
});

router.get('/home',authMiddleware,async (req,res)=>{
    const files = await fileModel.find({
        user: req.user.id
    })


res.render('index', { files });
})

router.post('/upload',authMiddleware,multer.single('file'), async (req,res)=>{

    try {
        const newFile = new fileModel({
            filename: req.file.originalname,
            path: req.file.path,
            user: req.user.id
        });

        await newFile.save();
        res.redirect('/home');
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).send("Internal server error");
    }
})


router.get('/download/:path',authMiddleware,async (req,res)=>{
    const file = await fileModel.findOne({
        path : req.params.path,
        user : req.user.id
    })

    if(!file){
        return res.status(404).send("File not found");
    }

    const signedUrl = await firebase.storage().bucket().file(file.path).getSignedUrl({
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60 
    });

    res.redirect(signedUrl[0]);
})

router.post('/logout',authMiddleware,(req,res)=>{
    res.clearCookie('token');
    res.redirect('/homepage');
})

module.exports = router;