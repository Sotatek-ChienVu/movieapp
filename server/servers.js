const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const db = require('./db')
const movieRouter = require('./routes/movie-router')
const loginRouter = require('./routes/login-router')
const productRouter = require('./routes/product-router')
const storeRouter = require('./routes/store-router')
const addressRouter = require('./routes/address-router')
const OrderRouter = require('./routes/order-router');
const NotifyRouter = require('./routes/notify-router');
const PaymentRouter = require('./routes/payment');
const app = express();
const path = require('path');
const Order = require('./models/order-model');
const Notify = require('./models/notify-model');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server, {origins: 'https://shopmen.herokuapp.com'});
const apiPort = process.env.PORT || 3001
const portSocket = process.env.PORTSOCKET || 3002
// proxy middleware options
let interval;
let countAccess = 0;
// io.sockets.on("connection", (socket) => {
//     if (interval) {
//       clearInterval(interval);
//     }
//     countAccess++;
//     socket.on('error', function() {
//         console.log('there was an error');
//       });
      
//     socket.on("disconnect", () => {
//       console.log("Client disconnected");
//       clearInterval(interval);
//     });
//    interval = setInterval(() => getNotify(socket) , 1000);
   
//    socket.on('Preview', (id)=> {
//     Notify.findByIdAndDelete({_id: id}, (err,pr)=> {
      
//     })
//     socket.emit('PreviewSuccess', 'SUCCESS')
//    });
//    interval = setInterval(()=> getAllOrder(socket), 1000);
//    interval = setInterval(()=> getAccessWebsite(socket, countAccess), 1000);
   
//   });
//   const getAllOrder = (socket) => {
//     Order.find({}, (err,order)=> {
//       socket.emit('getAllOrder', order)
//      })
//   }
//   const getNotify = (socket) => {
//     Notify.find({}, (err,notify) => {
//       socket.emit('Order', notify)
//     })
//   }
//   const getAccessWebsite = (socket, countAccess) => {
//     socket.emit('countAccess', countAccess);
//   }
    
//   global.io = io
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json());

 
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


app.use('/api', movieRouter)
app.use('/api', loginRouter)
app.use('/api', productRouter)
app.use('/api', storeRouter)
app.use('/api', addressRouter)
app.use('/api', OrderRouter)
app.use('/api', NotifyRouter)
app.use('/api', PaymentRouter)
app.listen(apiPort, () => console.log(`Server running on port server ${apiPort}`));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static('client/build'));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.resolve('client' , 'build', 'index.html'));
  });
}
io.listen(portSocket, () => console.log(`Server running on port ${apiPort}`));
