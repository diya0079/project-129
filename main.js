song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;

function preload() {
song=loadSound("bella ciao.mp3");
}

function setup () {
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

Posenet=ml5.poseNet(video,modelLoaded);
Posenet.on('pose',gotposes);
}

function modelLoaded() {
console.log('posenet is initialized');
}

function gotposes (results) {
    if(results.length>0) {
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist="+scoreleftwrist);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("leftwristx="+leftwristx+"leftwristy="+leftwristy) ;

        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console,log("rightwristx="+rightwristx+"rightwristy="+rightwristy);


    }

}

function draw () {
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#000000");
    if(scoreleftwrist>0.2){

    circle(leftwristx,leftwristy,20);
    no=Number(leftwristy);
    remove=floor(no);
    volume=remove/500;
    document.getElementById("volume").innerHTML="volume="+volume;
    song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

