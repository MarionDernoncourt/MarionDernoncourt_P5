// ------------------------- Validation données formulaire client ----------------------//

function getFormInformation() {
  // Déclaration des regex ////
  let regName = /^[a-zA-z -]+$/;
  let regEmail = /[A-z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-zA-Z]{2,10}/;

  // Validation prénom //
  document.getElementById("firstName").addEventListener("input", function (e) {
    if (!regName.test(e.target.value)) {
      document.getElementById("firstNameErrorMsg").innerText =
        "Prénom invalide";
    } else {
      document.getElementById("firstNameErrorMsg").innerText = "";
    }
  });

  // Validation nom //
  document.getElementById("lastName").addEventListener("input", function (e) {
    if (!regName.test(e.target.value)) {
      document.getElementById("lastNameErrorMsg").innerText = "Nom invalide";
    } else {
      document.getElementById("lastNameErrorMsg").innerText = "";
    }
  });

  // Validation ville //
  document.getElementById("city").addEventListener("input", function (e) {
    if (!regName.test(e.target.value)) {
      document.getElementById("cityErrorMsg").innerText = "Ville invalide";
    } else {
      document.getElementById("cityErrorMsg").innerText = "";
    }
  });

  //Validation email //
  document.getElementById("email").addEventListener("input", function (e) {
    if (!regEmail.test(e.target.value)) {
      document.getElementById("emailErrorMsg").innerText = "email invalide";
    } else {
      document.getElementById("emailErrorMsg").innerText = "";
    }
  });
}

getFormInformation();

//-------------------------- Envoyer données client au serveur ----------------------////

///  Ajout de l'évenement ///
document.getElementById("order").addEventListener("click", function (e) {
  e.preventDefault();

  /// Récupération des données client du formulaire ///
  let infoForm = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  console.log(infoForm);

  // -- Sauvegarde données client sur le LocalStorage -- //
  localStorage.setItem("formClient", JSON.stringify(infoForm));

  // -- Sauvegarde idProduit dans un tableau sur le LocalStorage -- //
  let idProduct = [];
  let productSavedInLocalStorage = JSON.parse(localStorage.getItem("product"));
  for (let product of productSavedInLocalStorage) {
    idProduct.push(product.id);
  }
  console.log(idProduct);

  /// Envoie données de la commande au serveur ///
  const order = {
    contact: infoForm,
    products: idProduct,
  };

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/JSON",
      "Content-type": "application/JSON",
    },
    body: JSON.stringify(order),
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      console.log(value);
      document.location.href = `confirmation.html?orderId=${value.orderId}`;
      localStorage.clear();
    })
    .catch(function (err) {
      console.log("une erreur est survenue", err);
    });
});
