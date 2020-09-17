// Firebase configuration
var firebaseScript = document.createElement('script');
firebaseScript.src = "js/firebase.js";
firebaseScript.onload = function() {
    var config = {
      apiKey: "AIzaSyB3LQFXpiuTvSU6BM9LRr_4F9iri1KrFmc",
      authDomain: "annotation-60cc5.firebaseapp.com",
      databaseURL: "https://annotation-60cc5.firebaseio.com",
      projectId: "annotation-60cc5",
      storageBucket: "annotation-60cc5.appspot.com",
      messagingSenderId: "779160233809",
      appId: "1:779160233809:web:e4bc12c298a46ac0c1d570",
      measurementId: "G-QJK1FRR5ZP"
    };

    firebase.initializeApp(config);

    // Get a reference to the database service
    var database = firebase.database();
}

document.body.appendChild(firebaseScript);

function downloadPieces(onLibraryDownloaded) {
    // firebase.app().database().ref().once('value')
    //     .then(function (snap) {
    //          onLibraryDownloaded(snap.val());
    //     });
    var url = "annotation/test.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    var request = new XMLHttpRequest();
    request.open("get", url);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
            var json = JSON.parse(request.responseText);
            // for(var i=0;i<json.length;i++){
            //     console.log(json[i].name);
            // }
            // console.log(json);
            onLibraryDownloaded(json);
        }
    }
}

function savePieceAnnotation(pieceId, count, annotation) {
    // for(i = 0; i < piecesToAnnotate.length; i++) {
        var annotationId = pieceId + "_" + (count + 1).toString();
        firebase.database().ref('annotations/' + annotationId).set({
            valence : annotation.valence,
            arousal: annotation.arousal,
            ex1_valence: annotation.answer1_1,
            ex1_arousal: annotation.answer1_2,
            ex1_description: annotation.answer1_3,
            ex2_valence: annotation.answer2_1,
            ex2_arousal: annotation.answer2_2,
            ex2_arousal: annotation.answer2_3,
            isKnown: annotation.isKnown,
            gender: annotation.gender,
            age: annotation.age,
            country: annotation.country,
            musicianship: annotation.musicianship,
        });
    // }
}
