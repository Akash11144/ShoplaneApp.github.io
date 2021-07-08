$(document).ready(function () {
    var ty = 0;
    document.getElementById("cart-wrapper").addEventListener("click", function () {
      window.open("JS Final Project checkout.html", "_self");
    })
    document.getElementById("btn-place-order").addEventListener("click", function () {
      window.alert("Order Placed")
      window.open("JS Final Project confirm.html", "_self");
    })
    var itemCount = JSON.parse(localStorage.getItem('ListItem'))
    if (itemCount != null) {
      var Counting = Object.values(itemCount)
      var cartCount = Counting.reduce((a, b) => {
        return a + b
      }, 0)
      $('#cart-count').text(cartCount)
    }
  
  
    function RenderCheckoutCards(data, num) {
      var checkoutCard = $("<div>").addClass("checkout-card")
      var xt = JSON.parse(localStorage.getItem('ListItem'))[data.id]
      var description = $("<p>").html('x' + xt)
      $("#card-list").append(checkoutCard)
      var ImgDiv = $("<div>")
      var Image = $("<img>").attr("src", data.preview)
      Image.addClass("checkout-product-img")
      ImgDiv.append(Image);
      var DescDiv = $("<div>")
      var name = $("<h4>").html(data.name)
      var totalPrice = data.price * xt
      var price = $("<p>").append($("<span>").html("Amount: Rs "), $("<span>").html(totalPrice).attr("id","adder"))
      DescDiv.append(name, description, price)
      checkoutCard.append(ImgDiv, DescDiv)
      ty = parseFloat( document.getElementById("total-amount").innerText)+totalPrice
      
    }
  
    
    var items = JSON.parse(localStorage.getItem('ListItem'))
    var addedItems = (Object.keys(items))
    var numberofItem = (Object.values(items))
    $("#item-count").html(addedItems.length)
    for (var i = 0; i < addedItems.length; i++) {
      var myurl = "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + addedItems[i];
      $.get(myurl, function (response) {
        RenderCheckoutCards(response)
        $("#total-amount").text(ty)
      }) 
    }

  })