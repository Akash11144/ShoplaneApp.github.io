 $(document).ready(function()
{

    var c=localStorage.getItem("HomeToProduct");
    console.log(c);
    var link="https://5d76bf96515d1a0014085cf9.mockapi.io/product/"+c;

    $.get(link,function(res)
    {

        document.getElementById("cart").addEventListener("click", function ()
         {
          window.open("JS Final Project checkout.html", "_self");
         });

         
          function createElement(eleToBeCreated,parentEle)
          {
              var c=document.createElement(eleToBeCreated);
              parentEle.append(c);
              return c;
          }
          
        var main1=document.getElementById("main");
          var productSection=createElement("section",main1)
             var leftSection=createElement("div",productSection);
             var pree=createElement("img",leftSection);
             pree.src=res.preview;
             pree.id="mainP"
             var rightSection=createElement("div",productSection);
                 var productDesc=createElement("div",rightSection);
                     var title=createElement("h1",productDesc);
                     title.innerText=res.name;
                     var brand=createElement("h4",productDesc);
                     brand.innerText=res.brand;
                     var price=createElement("h3",productDesc);
                     var priceM=createElement("span",price);
                     var priceM1=createElement("span",price);
                     priceM.innerText="Price:" + " " + "Rs" + " "
                     priceM1.innerText=res.price;
                     var desc=createElement("div",productDesc);
                         var descName=createElement("h3",desc);
                         descName.innerText="Description";
                         var descDet=createElement("p",desc);
                         descDet.innerText=res.description;
                    var productPreview=createElement("div",productDesc);
                        var previewTitle=createElement("h3",productPreview);
                        previewTitle.innerText="Product Preview";
                        var previewImg=createElement("div",productPreview);
                        var cartBtn = createElement("button", rightSection)
                        cartBtn.id = "btn-add-to-cart"
                        cartBtn.innerHTML = "Add to Cart"

        var pre;var c=0;
        for(var i=0;i<res.photos.length;i++)
        {
             pre=createElement("img",previewImg);
            pre.src=res.photos[i];
            pre.id=i;
            pre.className="smallImg"
            pre.addEventListener("click",function()
            {
              pree.src=res.photos[this.id];
              for(var j=0;j<res.photos.length;j++)
              {
                var d=document.getElementById(j);
                if(j==this.id)
                  d.style.border="2px solid #009688";
                else
                  d.style.border="0px";

                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
              }
          })
        }
        var e=document.getElementById("0");
        e.style.border="2px solid #009688";
        
        var itemCount = JSON.parse(localStorage.getItem('ListItem'))
        console.log(itemCount)
        if(itemCount != null){
          var Counting = Object.values(itemCount)
          var cartCount = Counting.reduce((a, b) => {
          return a + b
        }, 0)
        $('#cart-val').text(cartCount)}
    
        $("#btn-add-to-cart").click(function () {
          $("#cart").addClass('bigger')
          $("#btn-add-to-cart").css({ "background-color": "#4ba097" });
          setTimeout(function () {
            $('#cart').removeClass('bigger')
            $("#btn-add-to-cart").css({ "background-color": "#009688" });
          }, 200)
    
          var cartList = localStorage.getItem('ListItem')
          if (cartList == null) {
            var objectify = {}
            objectify[res.id] = 1
            localStorage.setItem('ListItem', JSON.stringify(objectify))
          }
          else {
            var objectify = JSON.parse(localStorage.getItem('ListItem'))
            if (objectify[res.id]) {
              objectify[res.id] += 1
            }
            else {
              objectify[res.id] = 1
            }
            localStorage.setItem('ListItem', JSON.stringify(objectify))
          }
    
          var itemCount = JSON.parse(localStorage.getItem('ListItem'))
          var Counting = Object.values(itemCount)
          var cartCount = Counting.reduce((a, b) => {
            return a + b
          }, 0)
          console.log(cartCount)
          $('#cart-val').text(cartCount)
    
    
    
        })

    });
        $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/order",function(res)
        {
            console.log(res);
        });

});
