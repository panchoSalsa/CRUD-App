var update = document.getElementById('update');
var del = document.getElementById('delete');

update.addEventListener('click', function () {

	console.log('click');
	fetch('quotes', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'name' : 'Darth Vader',
			'quote' : 'I find your lack of faith disturbing'
		})
	})
	.then(res => {
		if (res.ok) return res.json();
	})
	.then (data => {
		console.log(data);
		window.location.reload(true);
	});
});

del.addEventListener('click', function () {

	console.log('del');
	fetch('quotes', {
		method: 'delete',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'name' : 'Darth Vader'
		})
	})
	.then(res => {
		if (res.ok) return res.json();
	})
	.then (data => {
		console.log(data);
		window.location.reload(true);
	});
	console.log("fetch sent");
});