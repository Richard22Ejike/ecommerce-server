// IMPORTS FROM PACKAGES

const express = require("express");
const mongoose = require("mongoose");


// IMPORTS FROM OTHER FILES
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const swapRouter = require("./routes/swap");

// INIT
const PORT = process.env.PORT || 3000;
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const DB =
  "mongodb+srv://richard:liverpool22@cluster0.inxjrsz.mongodb.net/?retryWrites=true&w=majority";


// middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(swapRouter);
app.use(productRouter);
app.use(userRouter); 

// Connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
   
  });
  //Socket Logic


  io.on('connection', socket => {
    console.log('user connected');
    //Get the chatID of the user and join in a room of the same chatID
    chatID = socket.handshake.query.chatID
    socket.join(chatID)

    //Leave the room if the user closes the socket
    socket.on('disconnect', () => {
        socket.leave(chatID)
    })

    //Send message to only a particular user
    socket.on('send_message', message => {
        receiverChatID = message.receiverChatID
        senderChatID = message.senderChatID
        content = message.content

        //Send message to only that particular room
        socket.in(receiverChatID).emit('receive_message', {
            'content': content,
            'senderChatID': senderChatID,
            'receiverChatID':receiverChatID,
        })
    })
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});