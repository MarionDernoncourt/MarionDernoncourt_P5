const url = new URL(window.location.href); // récupération de l'url
const idConfirmation = url.searchParams.get("orderId"); // récupération de l'element ID dans l'url

function orderConfirmation() {
  document.getElementById("orderId").innerHTML = `${idConfirmation}`; // ajout du numéro de conf 
}

orderConfirmation();
