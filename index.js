import * as posenet from '@tensorflow-models/posenet';
const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;

const drawKeypoints = (keypoints) => {
  const cnvs = document.getElementById("canvas");
  cnvs.style.position = "absolute";
  cnvs.style.left = imageElement.offsetLeft + "px";
  cnvs.style.top = imageElement.offsetTop + "px";

  keypoints.forEach((key) => {
    const ctx = cnvs.getContext("2d");
    ctx.beginPath();
    ctx.arc(key.position.x, key.position.y, 5, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#00ff00';
    ctx.stroke();
  });
}

const estimatePoseOnImage = async (imageElement) => {
  const net = await posenet.load();
  const pose = await net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride);
  drawKeypoints(pose.keypoints);
}

const imageElement = document.getElementById('pose');
const pose = estimatePoseOnImage(imageElement);
