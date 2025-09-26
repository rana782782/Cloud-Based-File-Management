const Firebase = require('firebase-admin')
const serviceAccount = require('../drive-c815c-firebase-adminsdk-fbsvc-79ce323f2b.json');

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket:'drive-c815c.firebasestorage.app'
})

module.exports = Firebase;