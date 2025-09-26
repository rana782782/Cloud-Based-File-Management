const multer = require('multer');
const firebase = require('./firebase-admin')
const firebaseStorage = require('multer-firebase-storage');

const serviceAccount = require('../drive-c815c-firebase-adminsdk-fbsvc-79ce323f2b.json');
const { credential } = require('firebase-admin');


const storage = firebaseStorage({
    credentials : firebase.credential.cert(serviceAccount),
    bucketName : 'drive-c815c.firebasestorage.app',
    unique: true,
}) 

const upload = multer({
    storage: storage,
})

module.exports = upload;