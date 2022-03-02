// ------------------------- Validation données formulaire client ----------------------//

function getFormInformation() {
  // Déclaration des regex ////
  let regName = /^[a-zA-z]+$/;
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
    adress: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  console.log(infoForm)

  //// Save on localStorage //

  // -- données client -- //
  let contact = JSON.parse(localStorage.getItem("formClient"));
  contact = [];
  contact.push(infoForm);
  localStorage.setItem("formClient", JSON.stringify(contact));

  // -- données produit -- //
  let dataOrderSavedonLocalStorage = JSON.parse(localStorage.getItem("product"));

});
