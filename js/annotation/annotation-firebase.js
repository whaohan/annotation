function downloadPieces(onLibraryDownloaded) {
    var url = "php/get.php";
    var request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);
            onLibraryDownloaded(json);
        }
    }
}

function savePieceAnnotation(pieceId, count, annotation) {
    var annotationId = pieceId + "_" + (count + 1).toString();
    var account = sessionStorage.getItem('account')
    var complete = sessionStorage.getItem('complete');
    // send the data to server
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'php/save.php', false);
	let form = new FormData();
    form.set('annotationId', annotationId);
    form.set('valence', annotation.valence);
    form.set('arousal', annotation.arousal);
    form.set('complete', complete);
    form.set('account', account);

    console.log(annotationId)
    console.log(annotation)
    console.log(account)
    console.log(complete)

	xhr.send(form);
	alert(xhr.responseText);
}
