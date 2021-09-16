const express = require('express')
const socket = require("socket.io")
const app = express()
const randomNumber = () => Math.floor(Math.random()*1000)

app.use(require("cors"))
const port = 4000

const server = require("http").createServer(app);
const io = socket(server,{cors:true})
io.on("connection",socket => {
    console.log(socket.id + " connected");
    socket.on("disconnect",()=>{
        console.log(socket.id +" is disconnected")
    })
    setInterval(()=>{
        socket.emit("predict",{
            'x':new Date(new Date().toJSON()),
            'y':randomNumber()
        })
    },1000)
})

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})