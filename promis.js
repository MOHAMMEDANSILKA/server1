const cart=["paste","juice","milk"];
createOrder(cart, function(orderId){
  proceedToPayment(orderId);
});
 
