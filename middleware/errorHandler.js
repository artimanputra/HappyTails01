const logger = require('../config/logEvents')

const errorHandler = (err,req,res,next) =>{
    const message = `${err.name}\t${err.type}\t${err.message}`
    console.log(err.stack)
    logger(message,"err.log")
    next()
}

module.exports = errorHandler