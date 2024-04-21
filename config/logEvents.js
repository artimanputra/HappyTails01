const {v4:uuid} = require("uuid")
const {format} = require("date-fns")

const path = require('path')
const fs = require("fs")
const fsPromise = require('fs').promises

const logEvents = async (message,fileName) =>{
    const DateAndTime = format(new Date(),"dd/MM/yyyy HH:mm:SS")
    const finalMessage = `${DateAndTime}\t${uuid()}\t${message}\n`
    try{
        if(!fs.existsSync(path.join(__dirname,"..","logs"))){
            await fsPromise.mkdir(path.join(__dirname,"..","logs"))
        }
        await fsPromise.appendFile(path.join(__dirname,"..","logs",fileName),finalMessage)
    }
    catch(err){
        console.log(err)
    }
}

module.exports= logEvents