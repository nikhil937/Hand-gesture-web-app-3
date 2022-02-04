prediction1 = ""
prediction2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takesnapshot(){

    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML ='<img id="captured_img" src="'+data_uri+'"/>';
    }
    );
    }

   console.log("ml5.version",ml5.version);

    classifier =  ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ioZcEqxUV/model.json",modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is"+prediction1;
    speak_data2 = "The second prediction is"+prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
}

function identify() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {

    if (error) {
        console.error(error)
    }
    else {

        console.log(results);

        document.getElementById("result_emotion_name").innerHTML = results[0].label;

        document.getElementById("result_emotion_name1").innerHTML = results[1].label;
        prediction = results[0].label;
        prediction1 = results[1].label;
        speak();

        if(results[0].label == "Nice")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }

        if(results[0].label == "Thumbs up")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }

        if(results[0].label == "Peace")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }


        if(results[1].label == "Nice")
        {
            document.getElementById("update_emoji1").innerHTML = "&#128076;";
        }

        if(results[1].label == "Thumbs up")
        {
            document.getElementById("update_emoji1").innerHTML = "&#128077;";
        }

        if(results[1].label == "Peace")
        {
            document.getElementById("update_emoji1").innerHTML = "&#9996;";
        }
    }

}
