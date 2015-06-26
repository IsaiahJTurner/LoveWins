var URL = window.webkitURL || window.URL;
var originalImage;
$("input:file").change(function(e) {
  var imageSRC = URL.createObjectURL(e.target.files[0]);
  originalImage = new Image();
  originalImage.onload = function() {
    drawRainbowImage(0.5, originalImage)
  }
  originalImage.src = imageSRC;
});
$("#opacity").hide();

function drawRainbowImage(opacity, img) {
  var canvas = $('#canvas')[0];
  var ctx = $('#canvas')[0].getContext('2d');
  console.log(img.naturalWidth, img.naturalHeight);
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.globalAlpha = 1;
  ctx.drawImage(img, 0, 0);
  ctx.globalAlpha = opacity;
  var imgFlag = new Image();
  imgFlag.onload = function() {
    for (var i = 0; i < canvas.width; i++) {
      ctx.drawImage(imgFlag, 0, 0, imgFlag.width, imgFlag.height, i, 0, 1, canvas.height);
    }
  }
  imgFlag.src = "flag.png";
  $("#opacity").show();
}
$("#opacity").on("input change", function(e) {
  drawRainbowImage($(this).val(), originalImage)
})