//T1 CG - Lucas Gomes da Silva - 1312010
// ./npm install
// ./npm start 
// http://localhost:3000/
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

//ctx.font = '48px serif';
//ctx.fillText("escolha a imagem",50,100);

var listapontos = [];
var next = 0;

function writeMessage(canvas, message) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '11pt Calibri';
  ctx.fillStyle = 'white';
  ctx.fillText(message, 10, 25);

  for (let i=0;i<next-1;++i)
  {
    ctx.beginPath();
    ctx.moveTo(listapontos[i].x,listapontos[i].y);
    ctx.lineTo(listapontos[i+1].x,listapontos[i+1].y);
    ctx.strokeStyle = 'red';
    ctx.stroke();
  }
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

  ctx.beginPath();
  ctx.moveTo(listapontos[next-1].x,listapontos[next-1].y);
  ctx.lineTo(mousePos.x,mousePos.y);
  ctx.strokeStyle = 'red';
  ctx.stroke();

}, false);

canvas.addEventListener('click', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  listapontos[next] = {x : mousePos.x, y: mousePos.y};
  console.log(listapontos);
  ++next;

}, false);