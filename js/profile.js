// add the pieces checkbox
function updatePiecesLabels(piecesStr) {
    var pieces = piecesStr.split("@")
    for (var i = 0; i < pieces.length - 1; i++) {
        var checkbox = document.createElement("div");
        checkbox.classList.add("custom-control");
        checkbox.classList.add("custom-checkbox");

        var label = document.createElement("label");
        label.classList.add("custom-control-label");
        label.innerHTML = "Piece " + (i+1) + ": " + pieces[i];
        label.setAttribute("for", "knownPieceCheck" + i);
        checkbox.appendChild(label);

        document.getElementById("knownPiecesCheckboxes").appendChild(checkbox);
    }
}
// save the pieces we annotate
function updatePiecesCount(data) {
    var piecesData = data.pieces;

    if(piecesData != null) {
        var annotation = {};

        var piecesStr = sessionStorage.getItem("pieces");
        var pieces = piecesStr.split("@");

        var valenceStr = sessionStorage.getItem("valence");
        var valence = valenceStr.split("@");

        var arousalStr = sessionStorage.getItem("arousal");
        var arousal = arousalStr.split("@");

        for (var i = 0; i < pieces.length - 1; i++) {
            annotation.isKnown = $('#knownPieceCheck' + i).is(':checked');
            annotation.valence = JSON.parse("[" + valence[i].substring(0, valence[i].length - 2) + "]");
            annotation.arousal = JSON.parse("[" + arousal[i].substring(0, arousal[i].length - 2) + "]");

            savePieceAnnotation(pieces[i], annotation);
        }

        nextPage("main.html");
    }
}

function submitProfileForm() {
    downloadPieces(updatePiecesCount);
}

function main() {
    // only for adding checkbox
    var piecesStr = sessionStorage.getItem("names");
    if(piecesStr != null) {
        updatePiecesLabels(piecesStr);
    }
}
