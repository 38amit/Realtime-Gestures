function setup() {
    video = createCapture();
    video.size(700, 600);
    video.position(50, 180);

    canvas = createCanvas(550, 550);
    canvas.position(800, 200);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function draw() {
    background('#808080');
    document.getElementById("square_side").innerHTML = "Width and Height of a Square will be = " + difference + "px";
    fill('#FFC0CB');
    stroke('#FFC0CB');
    square(noseX, noseY, difference);
}

function modelLoaded() {
    console.log('PoseNet is Initialised!');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;

        console.log("noseX" + noseX + "noseY" + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;

        difference = floor(leftWristX - rightWristX);
        console.log("leftWristX =" + leftWristX + "rightWristX =" + rightWristX + "difference =" + difference);
    }
}