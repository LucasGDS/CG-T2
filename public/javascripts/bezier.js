//T1 CG - Lucas Gomes da Silva - 1312010
// ./npm install
// ./npm start 
// http://localhost:3000/
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//ctx.font = '48px serif';
//ctx.fillText("escolha a imagem",50,100);

function writeMessage(canvas, message) {
  var context = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  context.font = '11pt Calibri';
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillText(message, 10, 25);
}
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
  writeMessage(canvas, message);
}, false);