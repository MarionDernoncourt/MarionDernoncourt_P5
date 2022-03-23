// fonction pour vérifier individuellement les champs du formulaire //
function getFormInformation() {
  // Déclaration des regex ////
  const regName = /^[a-zA-ZÀ-ÿ -]+$/;
  const regEmail = /[A-z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-zA-Z]{2,10}/;

  // Validation prénom //
  document.getElementById("firstName").addEventListener("change", function (e) {
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

// fonction pour verifier que le panier ne soit pas vide //
function isCartValid() {
  let productSavedInLocalStorage = JSON.parse(localStorage.getItem("product"));
  if (productSavedInLocalStorage < 1) {
    return false;
  } else {
    return true;
  }
}
// fonction pour verifier le formulaire global pour confirmer l'envoi de la commande //
function isFormValid() {
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const email = document.getElementById("email");
  const regName = /^[a-zA-ZÀ-ÿ -]+$/;
  const regEmail = /[A-z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-zA-Z]{2,10}/;

  if (
    regName.test(firstName.value) &&
    regName.test(lastName.value) &&
    regName.test(city.value) &&
    regEmail.test(email.value) &&
    address.value !== ""
  ) {
    return true;
  } else {
    return false;
  }
}

// fonction pour récupérer donnée clients + envoi au serveur de la commande client via POST (réception confirmation) //
function confCart() {
  /// Récupération des données client du formulaire ///
  let infoForm = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  localStorage.setItem("formClient", JSON.stringify(infoForm)); // sauvegarde données client sur le LocalStorage

  // -- Sauvegarde idProduit dans un tableau sur le LocalStorage -- //
  let idProduct = [];
  let productSavedInLocalStorage = JSON.parse(localStorage.getItem("product"));
  for (let product of productSavedInLocalStorage) {
    idProduct.push(product.id);
  }

  const order = {
    contact: infoForm,
    products: idProduct,
  };

  /// Envoie données de la commande au serveur ///
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
      document.location.href = `confirmation.html?orderId=${value.orderId}`; // envoie vers la page de confirmation avec numéro de conf
      localStorage.clear(); // suppression du localstorage
    })
    .catch(function (err) {
      console.log("une erreur est survenue", err);
    });
}

// Fonction pour lancer la commande
function order() {
  document.getElementById("order").addEventListener("click", function (e) {
    e.preventDefault();
    if (isFormValid() && isCartValid()) {
      // si formulaire ok et au moins 1 produit dans le panier
      confCart();
    }
  });
}

getFormInformation();
order();
