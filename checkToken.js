 const jwt = require ('jsonwebtoken');
//const User = require ('./models/usermodel')

const checkToken = async (req, res, next) =>{
    try{
    console.log("entra al check token")
    const token = req.headers.authorization.split(' ')[1];
    console.log("el token es:", token)
    if (!token) {
        return res.status(403).json({message:'No token'})}
 
        const decoded = jwt.verify(token, 'AlkemyChallengeJS')
        console.log('ya verificó el token y el rtdo de deocded es:' , decoded)
        next()
    }
    catch(error){
        return res.status(401).json({message: error})
    }
}

module.exports = checkToken 