const jwt = require('jsonwebtoken')//для создания токена
const jvtsecret = require('config').get('seckretkey')//это я вытаскиваю ключ из конфига



const auth = (req, res, next) => {

    if (req.method === "OPTIONS") {
        return next()
    }
    try { 
        const toket = req.headers.authorization.split(' ')[1];
            if(!toket){
                // return res.status(401).json({message:"Ошибка авторизации"})
                res.redirect("/")
            }
        const decodet =  jwt.verify(toket,jvtsecret)
            req.user = decodet.userID;
            next()
    } catch (error) {
        return res.status(401).json({message:"Ошибка авторизации"})
        }
    }

module.exports = auth
