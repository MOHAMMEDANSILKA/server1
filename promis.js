const cart=["paste","juice","milk","rice","oil"];
createOrder(cart, function(orderId){
  proceedToPayment(orderId);
});
const promise =createOrder(cart);
promise.then(function(orderId){
  proceedToPayment(orderId);
  
});
 
