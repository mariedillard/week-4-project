function Order(pizzaSauce, pizzaToppings, beveragesOrdered, streetAddress, cityAddress, zipcodeAddress, total) {
  this.pizzaSauce = pizzaSauce,
  this.pizzaToppings = pizzaToppings,
  this.beveragesOrdered = beveragesOrdered,
  this.streetAddress = streetAddress,
  this.cityAddress = cityAddress,
  this.total = total
};
var newOrder = new Order([ ], [ ], [ ], " ", " ");
Order.prototype.totalwithTax = function () {
  var psT = parseInt(newOrder.pizzaSauce.length) * 9;
  var ptT = parseInt(newOrder.pizzaToppings.length) * 2;
  var boT = parseInt(newOrder.beveragesOrdered.length) * 3;
  var newTotal = psT + ptT + boT;
  var withTax = newTotal + newTotal*.005;
  return withTax.toFixed(2);
};

$(document).ready(function(){
  debugger;
  $("form#order").submit(function(event) {
    event.preventDefault();
    newOrder.zipcodeAddress = $("input#zipcodeAddress").val();
    newOrder.cityAddress = $("input#cityAddress").val();
    newOrder.streetAddress = $("input#streetAddress").val();
    $("input:checkbox[value=pizzaSauce]:checked").each(function(){
      newOrder.pizzaSauce.push($(this).attr("id"));
      alert(newOrder.pizzaSauce);
    });      $("input:checkbox[value=pizzaToppings]:checked").each(function(){
      newOrder.pizzaToppings.push($(this).attr("id"));
    });
    $("input:checkbox[value=beverages]:checked").each(function(){
      newOrder.beveragesOrdered.push($(this).attr("id"));
    });
    newOrder.total = newOrder.totalwithTax();
    if (newOrder.pizzaSauce.length >= 2 ) {
      alert("Error with order, please only choose one sauce!");
      location.reload(true);
    } else if (newOrder.pizzaSauce.length === 0 && newOrder.pizzaToppings.length === 0 && newOrder.beveragesOrdered.length === 0 ) {
      alert("Error with order, you didn't order anything!");
      location.reload(true);
    } else if (0 === newOrder.zipcodeAddress.length || 0 === newOrder.streetAddress.length || 0 === newOrder.cityAddress.length) {
      alert("Error with order, you did not list a delivery address.");
      location.reload(true);
    } else {
      $("#order-form").hide();
      $("ul#orders").append(
           "<li><span class='orderInfo'>View Your Order</span></li>");
      $("#order-info").show();
      $(".pizzaSauce").text(newOrder.pizzaSauce);
      $(".pizzaToppings").text(newOrder.pizzaToppings);
      $(".beverages").text(newOrder.beveragesOrdered);
      $(".zipcodeAddress").text(newOrder.zipcodeAddress);
      $(".streetAddress").text(newOrder.streetAddress);
      $(".cityAddress").text(newOrder.cityAddress);
      $(".total").text(newOrder.total);
    }
    $('#order')[0].reset();
  });
});
