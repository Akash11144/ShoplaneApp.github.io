$(document).ready(function () {
  var ty = 0;
   document.getElementById("cart-wrapper").addEventListener("click", function () {
    window.open("JS Final Project checkout.html", "_self");
  })

  var itemCount = JSON.parse(localStorage.getItem('ListItem'))
  if (itemCount != null) {
    var Counting = Object.values(itemCount)
    var cartCount = Counting.reduce((a, b) => {
      return a + b
    }, 0)
    $('#cart-count').text(cartCount)
  }

  function RenderCheckoutCards(data, num)
   {
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
    var price = $("<p>").append($("<span>").html("Amount: Rs "), $("<span>").html(totalPrice).attr("id", "adder"))
    DescDiv.append(name, description, price)
    checkoutCard.append(ImgDiv, DescDiv)
    ty = parseFloat(document.getElementById("total-amount").innerText) + totalPrice

  }

  var items = JSON.parse(localStorage.getItem('ListItem'))
  if (items != null) {
    var addedItems = (Object.keys(items))
    var numberofItem = (Object.values(items))
    
    console.log(addedItems)
    $("#item-count").html(addedItems.length)
    for (var i = 0; i < addedItems.length; i++) {
      var myurl = "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + addedItems[i];
      $.get(myurl, function (response) {
        RenderCheckoutCards(response)
        $("#total-amount").text(ty)
      })

    }
  }
  document.getElementById("btn-place-order").addEventListener("click", function () {


    var CreationTime = new Date()
    var tistime = CreationTime.getDate() + "-" + (CreationTime.getMonth() + 1) + "-" + CreationTime.getFullYear() + "  at" + " " + CreationTime.getHours() + ":" + CreationTime.getMinutes()


    var data2send = {
      createdAt: tistime,
      Username: "Akash Gupta",
      avatar: $("#myAvatar").attr("src"),
      amount: document.getElementById("total-amount").innerText,
      NoOfItems: 0
    }


    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/", function (response) {
       console.log(response)
      for (var i = 0; i < addedItems.length; i++) {
        for (var j = 0; j < response.length; j++) {
          if (addedItems[i] == response[j].id) {
            for (var k = 0; k < Object.keys(response[addedItems[i]]).length; k++) {
              var yy = "product" + "[" + (i + 1) + "]" + "[" + Object.keys(response[addedItems[i]])[k] + "]";
              var vv = Object.keys(response[addedItems[i]])[k]
              if (vv === "size" || vv === "description" || vv === "photos") {
                continue;
              } else {
                var user = Object.entries(response[(addedItems[i])-1])[k]
                var trr=Object.fromEntries(Object.entries(user))[1]
                data2send[yy] = Object.fromEntries(Object.entries(user))[1];
                data2send.NoOfItems = numberofItem[i]
              }
            }
          }
        }
      }

      var xx = JSON.stringify(data2send)
      
        $.ajax({
          type:"POST",
          url:"https://5d76bf96515d1a0014085cf9.mockapi.io/order",
          data:xx,
          statusCode:
           {
             404: ()=>console.log( "page not found" ),
             400: ()=>console.log("yehi dikkat h")
           },
          success:()=>{
                         window.alert("Order Placed")
                         window.open("JS Final Project confirm.html", "_self");
                       },
          status:(e)=>alert(e.message),
          error:()=>{
                         localStorage.setItem("FinalOrder", xx)
                          window.alert("Order Placed")
                         window.open("JS Final Project confirm.html", "_self");
                    }     
        })

       
    })

  })

})

