// add the pieces checkbox
function updatePiecesLabels(piecesStr) {
    var pieces = piecesStr.split("@")
    for (var i = 0; i < pieces.length - 1; i++) {
        var checkbox = document.createElement("div");
        checkbox.classList.add("custom-control");
        checkbox.classList.add("custom-checkbox");

        var input = document.createElement("input");
        input.classList.add("custom-control-input");
        input.setAttribute("type", "checkbox");
        input.id = "knownPieceCheck" + i;
        checkbox.appendChild(input);

        var label = document.createElement("label");
        label.classList.add("custom-control-label");
        label.innerHTML = "Piece " + (i+1) + ": " + pieces[i];
        label.setAttribute("for", input.id);
        checkbox.appendChild(label);

        document.getElementById("knownPiecesCheckboxes").appendChild(checkbox);
    }
}

function updatePiecesCount(data) {
    var piecesData = data.pieces;
    var annotationData = data.annotations;

    if(piecesData != null) {
        var piecesAnnCount = getPiecesAnnotationCount(piecesData, annotationData);

        var annotation = {};

        var piecesStr = sessionStorage.getItem("pieces");
        var pieces = piecesStr.split("@");

        var valenceStr = sessionStorage.getItem("valence");
        var valence = valenceStr.split("@");

        var arousalStr = sessionStorage.getItem("arousal");
        var arousal = arousalStr.split("@");

        for (var i = 0; i < pieces.length - 1; i++) {
            var count = piecesAnnCount[pieces[i]];

            annotation.isKnown = $('#knownPieceCheck' + i).is(':checked');
            annotation.valence = JSON.parse("[" + valence[i].substring(0, valence[i].length - 2) + "]");
            annotation.arousal = JSON.parse("[" + arousal[i].substring(0, arousal[i].length - 2) + "]");

            savePieceAnnotation(pieces[i], count, annotation);
        }

        nextPage("main.html?rand=" + Math.random());
    }
}

function submitProfileForm() {
    downloadPieces(updatePiecesCount);
}

function main() {
    var piecesStr = sessionStorage.getItem("names");
    if(piecesStr != null) {
        updatePiecesLabels(piecesStr);
    }
}
