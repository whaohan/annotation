function downloadPieces(onLibraryDownloaded) {
    var url = "annotation/test.json";
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
    // send the data to server
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'php/save.php', true);
	let form = new FormData();
    form.set('annotationId', annotationId);
    form.set('valence', annotation.valence);
    form.set('arousal', annotation.arousal);

	xhr.onreadystatechange = function () {
		if (xhr.readyState != 4) {
			return;
		}
		alert(xhr.responseText);
	};
	xhr.send(form);
}
