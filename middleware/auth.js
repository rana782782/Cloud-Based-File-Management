const jwt = require('jsonwebtoken');

function userAuth(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).send("unauthorized access");
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }
    catch(error){
        console.error("JWT verification failed:", error);
        return res.status(401).send("unauthorized access");
    }
}

module.exports = userAuth;