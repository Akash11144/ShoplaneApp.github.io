console.log("jquery begin")
$(document).ready(function (e) {
  document.getElementById("cart-wrapper").addEventListener("click", function () {
   window.open("JS Final Project checkout.html", "_self");


  })
  console.log("dom ready")
  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function (res) {
    console.log(res);
    function elementCreation(eleToBECreated, parentElement) {
      var a = document.createElement(eleToBECreated);
      parentElement.append(a);
      return a;
    }


    var productSection = document.getElementById("clothing");
    var accessoriesSection = document.getElementById("accessory");

    var sectionProductHeading = elementCreation("h2", productSection);
    sectionProductHeading.innerText = "Clothing for Men and Women";
    cardContainerP = elementCreation("div", productSection);
    cardContainerP.className = "cardContainer1"

    var sectionAccessoryHeading = elementCreation("h2", accessoriesSection);
    sectionAccessoryHeading.innerText = "Accessories for Men and Women";
    cardContainerA = elementCreation("div", accessoriesSection);
    cardContainerA.className = "cardContainer1"

    var cardContainer, card, imgContainer, detailConatainer, name, brand, price, mainDiv;
    for (var i = 0; i < res.length; i++) {
      if (res[i].isAccessory) {
        card = elementCreation("div", cardContainerA);
        card.className = "card1";
        card.id = res[i].id;
        imgContainer = elementCreation("div", card);
        imgContainer.className = "imgContainer1"
        var pre = elementCreation("img", imgContainer);
        detailConatainer = elementCreation("div", card);
        detailConatainer.className = "detailDiv";
        name = elementCreation("h3", detailConatainer);
        brand = elementCreation("h4", detailConatainer);
        price = elementCreation("h5", detailConatainer);
        name.innerText = res[i].name;
        brand.innerText = res[i].brand;
        price.innerText = "Rs" + " " + res[i].price;
        pre.src = res[i].preview;
        card.addEventListener("click", function () {
          localStorage.setItem("HomeToProduct", this.id);
          window.open("JS Final Project product.html", "_self");
        })

      }
      else {
        card = elementCreation("div", cardContainerP);
        card.className = "card1";
        card.id = res[i].id;
        imgContainer = elementCreation("div", card);
        imgContainer.className = "imgContainer1"
        var pre = elementCreation("img", imgContainer);
        detailConatainer = elementCreation("div", card);
        detailConatainer.className = "detailDiv";
        name = elementCreation("h3", detailConatainer);
        brand = elementCreation("h4", detailConatainer);
        price = elementCreation("h5", detailConatainer);
        name.innerText = res[i].name;
        brand.innerText = res[i].brand;
        price.innerText = "Rs" + " " + res[i].price;
        pre.src = res[i].preview;
        card.addEventListener("click", function () {
          localStorage.setItem("HomeToProduct", this.id);
          window.open("JS Final Project product.html", "_self");
        })
      }
    }
    var itemCount = JSON.parse(localStorage.getItem('ListItem'))
    if(itemCount !=null){
    var Counting = Object.values(itemCount)
    var cartCount = Counting.reduce((a, b) => {
      return a + b
    }, 0)}
    console.log(cartCount)
    $('#cart-count').text(cartCount)
  });
});