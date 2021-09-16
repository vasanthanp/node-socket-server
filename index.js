const express = require('express')
const socket = require("socket.io")
const app = express()

app.use(require("cors"))
const port = 4000

const server = require("http").createServer(app);
const io = socket(server,{cors:true})
io.on("connection",socket => {
    console.log(socket.id + " connected");
    socket.on("disconnect",()=>{
        console.log(socket.id +" is disconnected")
    })
    socketGeneration(socket)
})
let data;
const randomNumber = () => Math.floor(Math.random()*1000)
const generateData = () => {
    data = ["https://api.com"]
    for(let i=0;i<4;i++) {
        data.push(randomNumber())
    }
    return data;
}   
const sendPredictedData = (socket) => {
    data = generateData()
    socket.emit("predicted", data)
}
const socketGeneration = (socket) => {
    setInterval(() => {sendPredictedData(socket)},1000)
}
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})