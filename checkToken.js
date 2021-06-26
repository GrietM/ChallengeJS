const jwt = require ('jsonwebtoken');

const checkToken = async (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'AlkemyChallengeJS')
        if (!token) {
            return res.status(403).json({message:'No token'})
        }
        next()
    }
    catch(error){
        return res.status(401).json({message: error})
    }
}

module.exports = checkToken 