const Order = require('../models/order-model');
const StoreNotify = require('../models/notify-model');
CreateOrder = (req,res) => {
    const body = req.body
    if(!body){
        return res.status(400).json({status: 'ERROR', message: 'body request null'})
    }
    const order = new Order({...body, status: 0, status_Order: 1})
    if(!order){
        return res.status(400).json({status: 'ERROR', message: 'Not Create Order - Form'})
    }
    order.save()
      .then(()=> {
        return res.status(200).json({status: 'SUCCESS', message: 'Create order Success', orderId: order._id});

      })
      .catch(err => {
        return res.status(400).json({status: 'ERROR', message: err})
 
      })
      const newNoti = new StoreNotify(body);
      newNoti.save()
}
getOrderUser = (req, res) => {
  const idUser = req.params.userId
  Order.find({idUser: idUser},(err,order)=> {
      if(err){
          return res.status(400).json({status: 'ERROR', message: err})
      }
      if(!order || order.length < 1){
        return res.status(400).json({status: 'ERROR', message: 'Order Form of userId not found'})
      }
      return res.status(200).json({status: 'SUCCESS', data: order, message: 'Success'})
  })
}

getAllOrder = async(req, res) => {
  await Order.find({},(err, order)=> {
    if(err){
      return res.status(400).json({status: 'ERROR', message: err})
    }
    if(!order || order.length < 1) {
      return res.status(400).json({status: 'ERROR', message: 'Order not found'});
    }
    return res.status(200).json({status: 'SUCCESS',message: 'Success', data: order})
  })
}

deleteOrder = async(req, res) => {
  const id = req.params.id
  await Order.findByIdAndDelete({_id: id}, (err, order)=>{
     if(err){
       return res.status(400).json({status: 'ERROR', message: 'Delete Success'})
     }
     if(!order){
       return res.status(400).json({status: 'ERROR', message: 'Order not found'})
     }
     return  res.status(200).json({status: 'SUCCESS', message: 'Delete success'});
  })
}

editOrder = async(req,res) => {
  const body = req.body;
  if(!body){
    return res.status(400).json({status: 'ERROR', message: 'Body request not found'});
  }
  await Order.findByIdAndUpdate({_id: body._id}, body , (err, order)=> {
    if(err){
      return res.status(400).json({status: 'ERROR', message: err})
    }
    if(!order){
      return res.status(400).json({status: 'ERROR', message: 'Order not found'})
    }
    return res.status(200).json({status: 'SUCCESS', message: 'Edit success'})
  })
   
}

searchOrder = async(req,res) => {
  const result = [];
  const keySearch = req.params.search;
  console.log(keySearch)
  await Order.find({}, (err, order) => {
    if(err){
      return res.status(400).json({status: 'ERROR', message: err})
    }
    if(!order || order.length < 1){
      return res.status(200).json({status: 'SUCCESS',message: 'Order width name not found', data: []})
    }
    if(order){
      order?.forEach((el) => {
        if (
          el.infor.name.toLowerCase().includes(keySearch.toLowerCase()) ===
          true
        ) {
          result.push(el);
        }
      });
      if (result.length > 0) {
        return res
          .status(200)
          .json({ status: "SUCCESS", message: "Search Success", result });
      }
      if (!result.length)
        res
          .status(200)
          .json({
            status: "ERROR",
            message: "No result search",
            errorCode: "ERROR.SEARCH.NOT.FOUND",
            result: [],
          });
    }
  })
}
module.exports = {CreateOrder, getOrderUser, getAllOrder, deleteOrder, editOrder, searchOrder}