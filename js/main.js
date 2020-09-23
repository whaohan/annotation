// reload the page
location.reload();
// get the stored data
var account = sessionStorage.getItem("account");
var password = sessionStorage.getItem("password");
var complete = sessionStorage.getItem("complete");

let form = new FormData();
form.set('account', account);
form.set('password', password);
// Submit the form
let xhr = new XMLHttpRequest();
xhr.open('POST', 'php/validate.php', true);

xhr.onreadystatechange = function() {	
    var result = xhr.responseText;
    if(result == -1) {
        alert("The account is not found! Please check your account and password and try again.");
        nextPage("index.html");
    } else {
        sessionStorage.setItem("complete", result);
        document.getElementById('account').innerText = account;
        document.getElementById("complete").innerText= complete;
    }
}
// Send the request
xhr.send(form);