var annotationStartingPoint = {x: 0.0, y: 0.0}
var annotationDuration = 15;

function main() {
    downloadPieces(getPiecesToAnnotate);

    initController();
    initCanvas();

    setStep1Modal();
}

function updateAnnotation() {
    if(drag) {
        updateProgressBar();
        annotateEmotion();
    }

    drawCanvas();

    requestAnimationFrame(updateAnnotation);
}

function updateFeedbackValue() {
    if(currentPiece < 0 || currentPiece >= piecesToAnnotate.length)
        return;

    var rect = canvas.getBoundingClientRect();

    var valence = ((annotationPoint.x - canvas.width*0.5)/circumplexRadius);
    var arousal = ((annotationPoint.y - canvas.height*0.5)/circumplexRadius) * -1;

    var labels = document.getElementById("circumplex-labels");
    if(labels) {
        labels.innerHTML = "Valence: " + valence.toFixed(2) + "<br>" + "Arousal: " + arousal.toFixed(2);
    }
}

function updateProgressBar() {
    progressBar = document.getElementById('progress')
    if(progress != null) {

        if(annotationState == 0)
            document.getElementById("progressTitle").innerHTML = "步骤1: 校准";
        else if (annotationState == 1)
            document.getElementById("progressTitle").innerHTML = "步骤2: 标注";

        var audioControls = document.getElementById('audio-controls')

        var duration = annotationDuration;
        if (annotationState == 1) {
            duration = piecesToAnnotate[currentPiece].duration;
        }

        var remainingTime = formatSecondsAsTime(audioControls.currentTime);
        var totalTime = formatSecondsAsTime(duration);

        document.getElementById("remainingTime").innerHTML = remainingTime + "/" + totalTime;

        var percentPlayed = Math.ceil((audioControls.currentTime/duration)*100);
        progressBar.style.width = String(percentPlayed) + "%";

        if(percentPlayed >= 100) {
            audioControls.pause();
            document.getElementById("remainingTime").innerHTML = totalTime + "/" + totalTime;

            if (annotationState == 0) {
                annotationStartingPoint.x = annotationPoint.x;
                annotationStartingPoint.y = annotationPoint.y;

                setStep2Modal();
            }
            else {
                setStep3Modal();
            }
        }
    }
}

function updatePieceLabel(pieceName) {
    document.getElementById("piece-name").innerHTML = pieceName;
}

function setStep1Modal() {
    // document.getElementById("annotationStep").innerHTML = "Step 1 - Calibration";
    document.getElementById("modalTitle").innerHTML = "步骤1: 校准";
    document.getElementById("modalBodyFirstParagraph").innerHTML =
        `聆听曲目的前15秒，并设置标注的起点。`;

    document.getElementById("modalBodySecondParagraph").innerHTML = ``;
    document.getElementById("modalConfirmationButton").innerHTML = "开始校准";

    $('#modalCloseButton').addClass("d-none");

    $('#modalCloseButton').off('click');
    $('#modalConfirmationButton').off('click');

    mouseUp();
    $('#myModal').modal('show');
}

function setStep2Modal() {
    // document.getElementById("annotationStep").innerHTML = "Step 2 - Annotation";
    document.getElementById("modalTitle").innerHTML = "步骤2: 标注";
    document.getElementById("modalBodyFirstParagraph").innerHTML =
        `再次聆听这段音乐，并进行完整标注。`;

    document.getElementById("modalBodySecondParagraph").innerHTML =
        `<b>请记住，音乐中的情感通常不会变化很大。</b>`;

    document.getElementById("modalConfirmationButton").innerHTML = "开始标注";

    $('#modalCloseButton').addClass("d-none");
    $('#modalCloseButton').off('click');

    $('#modalConfirmationButton').off('click');
    $('#modalConfirmationButton').on('click', function (e) {
        annotationState = 1;

        // document.getElementById('audio-controls').currentTime = 0;
        // updateProgressBar();
        initAnnotationPoint();
    });

    mouseUp();
    $('#myModal').modal('show');
}

function setStep3Modal() {
    // document.getElementById("annotationStep").innerHTML = "Step 3 - Confirmation";
    document.getElementById("modalTitle").innerHTML = "步骤3: 确认";

    document.getElementById("modalBodySecondParagraph").innerHTML = "";

    document.getElementById("modalCloseButton").innerHTML = "重新标注";

    if(currentPiece < piecesToAnnotate.length - 1) {
        document.getElementById("modalBodyFirstParagraph").innerHTML = `
        您已经完成了对这首音乐的标注。您要继续进行下一首音乐的标注吗？`;
        document.getElementById("modalConfirmationButton").innerHTML = "下一首音乐";

        $('#modalConfirmationButton').off('click');
        $('#modalConfirmationButton').on('click', function (e) {
            annotationState = 0;
            nextPiece();
        });
    }
    else {
        document.getElementById("modalBodyFirstParagraph").innerHTML = `
        恭喜您！您完成了对这组音乐的标注。`;
        document.getElementById("modalConfirmationButton").innerHTML = "完成本次标注";

        $('#modalConfirmationButton').off('click');
        $('#modalConfirmationButton').on('click', function (e) {
            annotationState = 0;
            finishAnnotation();
        });
    }

    $('#modalCloseButton').removeClass("d-none");
    $('#modalCloseButton').on('click', function (e) {
        initAnnotationPoint();
    });

    mouseUp();
    $('#myModal').modal('show');
}
