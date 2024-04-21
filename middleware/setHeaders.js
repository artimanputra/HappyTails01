const setHeaders = (req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization")
    res.header("Access-Control-Allow-Methods","GET,POST,PATCH,PUT,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Credentials",true)
    next()
}

module.exports = setHeaders