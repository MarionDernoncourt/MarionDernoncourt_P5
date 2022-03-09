const url = new URL(window.location.href);
const idConfirmation = url.searchParams.get("orderId");

console.log(idConfirmation);

document.getElementById("orderId").innerHTML = `${idConfirmation}`;
