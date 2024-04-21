const logEvents = require("../config/logEvents")
const logger = (req,res,next) =>{
    const message = `${req.method} ${req.url} ${req.headers.origin}`
    console.log(message)
    logEvents(message,"req.log")
    next()
}
module.exports = logger