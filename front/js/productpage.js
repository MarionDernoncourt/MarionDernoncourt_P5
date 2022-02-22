/////// Récupération id du produit /////////
let url = new URL(window.location.href);
let idProduct = url.searchParams.get("id");

///////////////////// Récupération des données produits ////////////////////
async function main() {
  const article = await getArticle();

  ///// Add product image /////
  let imageArticle = document.createElement("img");
  imageArticle.src = article.imageUrl;
  imageArticle.alt = article.altTxt;
  document.getElementsByClassName("item__img")[0].appendChild(imageArticle);

  ///// Add product name /////
  let nameArticle = document.getElementById("title");
  nameArticle.innerHTML = article.name;

  ///// Add product description /////
  let descriptionArticle = document.getElementById("description");
  descriptionArticle.innerHTML = article.description;

  ///// Add product price /////
  let priceArticle = document.getElementById("price");
  priceArticle.innerHTML = article.price;

  /////Pick color //////

  for (let colors of article.colors) {
    let colorOption = document.createElement("option");
    document.getElementById("colors").appendChild(colorOption);
    colorOption.value = colors;
    colorOption.innerHTML = colors;
  }
}
////// Récupération des données de l'API /////
function getArticle() {
  return fetch("http://localhost:3000/api/products/" + idProduct)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      return value;
    })
    .catch(function (err) {
      console.log("une erreur est survenue", err);
    });
}

////////////////////////////////////// Add to Cart ///////////////////////////////////////////

/// add event listener //
document.getElementById("addToCart").addEventListener("click", (event) => {
  event.preventDefault();

  // récupération des donnée du produit sélectionné //
  let SelectedProduct = {
    id: idProduct,
    quantity: document.getElementById("quantity").value,
    color: document.getElementById("colors").value,
  };

  //////////////////// Save to local storage ////////////////////////

  let productSavedInLocalStorage = JSON.parse(localStorage.getItem("product"));
  console.log(productSavedInLocalStorage);
  if (productSavedInLocalStorage) {
    // quand il y a deja des produits dans le panier
    productSavedInLocalStorage.push(SelectedProduct);
    localStorage.setItem("product", JSON.stringify(productSavedInLocalStorage));
  } else {
    // quand aucun produit saved dans le panier //
    productSavedInLocalStorage = [];
    productSavedInLocalStorage.push(SelectedProduct);
    localStorage.setItem("product", JSON.stringify(productSavedInLocalStorage));
  }
});

main();
