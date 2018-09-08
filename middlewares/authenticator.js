const auth = (req, res, next) => {
        if(req.headers.auth === "1234"){
            next();
        } else {
            res.status(401).send('You are not authorizd!');
        }
    }

module.exports = auth;
