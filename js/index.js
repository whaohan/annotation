function SubmitForm(e)
{
	e.preventDefault();
	// Reset the styles
	document.querySelectorAll('input[type="text"]').forEach(input => input.className = '');
	// Collect form data
    let form = new FormData(document.querySelector('form'));

    console.log(form);
    
	// Submit the form via AJAX
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'php/validate.php', true);
	// Set the event when the upload completed
	xhr.onreadystatechange = function ()
	{
		if (xhr.readyState != 4)
		{
			return;
		}
		// console.log(xhr.status + ': ' xhr.responseText);
		// Invalid submit
		if (xhr.status == 403)
		{
			document.querySelectorAll('input[type="text"]').forEach(input => input.className = 'error');
		}
		if (xhr.status == 400)
		{
			document.querySelector('input[type=file]').className = 'error';
		}
		if (xhr.status == 409)
		{
			document.querySelector('select').className = 'error';
		}
		// Show the result
		var result = xhr.responseText;
		if(result == -1) {
			alert("The account is not found! Please check your account and password and try again.");
		} else {
			account = document.querySelector("input#account");
			password = document.querySelector("input#password");
			sessionStorage.setItem("account", account);
			sessionStorage.setItem("password", password);
			sessionStorage.setItem("complete", result);
			nextPage("main.html");
		}
		// Reset the form
		document.querySelector('form').reset();
	};
	// Send the request
	xhr.send(form);
}
// Add event listeners
document.querySelector('form').addEventListener('submit', SubmitForm);
document.querySelectorAll('input, select').forEach(input => input.addEventListener('focus', e => e.target.className = ''));
