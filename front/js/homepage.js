///////// Récupération données API ///////////////

async function main() {
  let products = await getProducts();

  /// template carte produit ///
  for (let product of products) {
    let template = `
        <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>
      `;
    document.getElementById("items").innerHTML += template;
  }
}

function getProducts() {
  return fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      return value;
    })
    .catch(function (err) {
      console.log("une erreur est survenue: ", err);
    });
}
main();
