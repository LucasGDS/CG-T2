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
var drawing = 0;
var hlpoint = -1;
var mousedown = 0;

function writeMessage(canvas, message) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '11pt Calibri';
  ctx.fillStyle = 'white';
  ctx.fillText(message, 10, 25);

  for (let i=0;i<next;++i)
  {
    ctx.beginPath();
    ctx.fillStyle = 'blue'; 
    ctx.arc(listapontos[i].x, listapontos[i].y, 5, 0, 2 * Math.PI, true); 
    ctx.fill(); 

    if(i == next-1)
      break;
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

function redraw(mousePos) {

  if (drawing === 1)
  {
    ctx.beginPath();
    ctx.moveTo(listapontos[next-1].x,listapontos[next-1].y);
    ctx.lineTo(mousePos.x,mousePos.y);
    ctx.strokeStyle = 'red';
    ctx.stroke(); 

    ctx.beginPath();
    ctx.fillStyle = 'blue'; 
    ctx.arc(mousePos.x, mousePos.y, 5, 0, 2 * Math.PI, true); 
    ctx.fill(); 
  }
  else if (drawing === 2)
  {
    for (let i=0;i<next;++i)
    {
      if((mousePos.x<= listapontos[i].x + 5 && mousePos.x>= listapontos[i].x - 5) || (hlpoint==i && mousedown === 1))
      {
        if((mousePos.y<= listapontos[i].y + 5 && mousePos.y>= listapontos[i].y - 5) || (hlpoint==i && mousedown === 1))
        {
          ctx.beginPath();
          ctx.fillStyle = 'cyan'; 
          ctx.arc(listapontos[i].x, listapontos[i].y, 5, 0, 2 * Math.PI, true); 
          ctx.fill(); 
          hlpoint = i;
          if (mousedown === 1)
          {
            listapontos[i] = {x : mousePos.x, y: mousePos.y};
          }
          if (mousedown === 0)
          {
            hlpoint = -1;
          }
        }
        else 
        {
          //hlpoint = -1;
        }
      }
      else
      {
        //hlpoint = -1;
      }
    }
  }
}

canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
  writeMessage(canvas, message);
  redraw(mousePos);
}, false);

canvas.addEventListener('mousedown', function(evt) { //mousedown or mouseclick?
  var mousePos = getMousePos(canvas, evt);
  mousedown = 1; 

  if(drawing === 0 || drawing === 1)
  {
    listapontos[next] = {x : mousePos.x, y: mousePos.y};
    ++next;
  }

  if(next === 1)
  {
    drawing = 1;
  }

  if(next === 4)
  {
    drawing = 2;
  }
  console.log(listapontos);
}, false);

canvas.addEventListener('mouseup', function(evt) {
  mousedown = 0;
  hlpoint = -1;
}, false); 

function clearcanvas()
{
  listapontos = [];
  next = 0;
  drawing = 0;
  hlpoint = -1;
  mousedown = 0;

  writeMessage(canvas, " ");
}